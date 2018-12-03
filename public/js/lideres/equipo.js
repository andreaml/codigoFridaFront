var team = null;
const idEquipo = ID_EQUIPO;

function getTeam() {
	const paramsObj = {
		url: `${localStorage.apiUrl}equipos/${idEquipo}`,
		method: 'GET'
	}
	$.ajax(setRequestParams(paramsObj))
  	.done((data) => {
        team = data;
				console.log(data);
        showTeam();
        showMentors(team.mentores[0]);
        showTeamMembers(team.integrantes[0]);
        showAchievements(team.insignias[0]);
    })
    .fail((error) => {
        console.log(error)
    });
}

function showTeam() {
    const { id, nombre, codigo } = team;
    $('#idModulo').text(id)
    $('#nombreEquipo').text(nombre)
    $('#codigoEquipo').text(codigo)
}

function showMentors(contents, $template = $('#plantillaMentor')) {
    const $mentorTemplate = $($template.html());
    const $mentors = contents.map(({nombre, apPaterno, apMaterno, correo, fotografia}, index) => {
        const $clonedTemplate = $mentorTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src",(fotografia.length>5)?fotografia:"/img/image.jpeg");
        $clonedTemplate.find('.nombre').append(`${nombre} ${apPaterno} ${apMaterno}`);
        $clonedTemplate.find('.correo').append(correo);
        return $clonedTemplate;
    });
    $('#divMentores').append($mentors);
    initFileStyle();
}

function showTeamMembers(contents, $template = $('#plantillaIntegrante')) {
    const $teamMemberTemplate = $($template.html());
    const member = contents.map(({nombre, apPaterno, apMaterno, correo, fotografia, fechaNacimiento}, index) => {
        const $clonedTemplate = $teamMemberTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src",(fotografia.length>5)?fotografia:"/img/image.jpeg");
        $clonedTemplate.find('.nombre').append(`${nombre} ${apPaterno} ${apMaterno}`);
        $clonedTemplate.find('.correo').append(correo);
        $clonedTemplate.find('.edad').append(calcAge(fechaNacimiento));
        return $clonedTemplate;
    });
    $('#divIntegrantes').append(member);
    initFileStyle();
}

function calcAge(fechaNacimiento) {
    return moment().diff(fechaNacimiento, 'years');
}

function showAchievements(contents, $template = $('#plantillaInsignia')) {
    const $achievementTemplate = $($template.html());
    const achievement = contents.map(({nombre, descripcion, idInsignia}, index) => {
        const $clonedTemplate = $achievementTemplate.clone();

        $clonedTemplate.find('.imgPerfil').attr("src",`/img/insignias/modulo${idInsignia}.jpeg`);
        $clonedTemplate.find('.nombre').append(nombre);
        $clonedTemplate.find('.descripcion').append(descripcion);
        return $clonedTemplate;
    });
    $('#divInsignias').append(achievement);
    initFileStyle();
}

$(document).ready(function() {
	getTeam();
});
