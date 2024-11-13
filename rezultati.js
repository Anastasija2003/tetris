$(document).ready(

    function(){
        rezultati = JSON.parse(localStorage.getItem("rezultati"));
        for(let i = 1; i<6 && i <=rezultati.length;i++){
            $("#ime"+i.toString()).text(rezultati[i-1].name.toString());
            $("#rez"+i.toString()).text(rezultati[i-1].value.toString());
        }
    }
);