$(document).ready(function(){
    let trenutni;
    let sledeci;
    let px;
    let py;
    let broj_poena = 0;
    let tezina = 0;
    let elementi = [0,0,0,0,0,0,0];
    let funkcija_interval;
    let period;
    let element = {};
    let novi = {};
    let izgubljeno = 0;
    let obrnuto = 0;
    let poslednjiRezultat = {name:"-",value:0};
    let rezultati = [{name : "-",value : 0}];
    if(localStorage.getItem("rezultati") == null )localStorage.setItem("rezultati",JSON.stringify(rezultati));
    localStorage.setItem("poslednjiRezultat",JSON.stringify(poslednjiRezultat));

    function prikazi(){
        switch(sledeci){
            case 0:
                $("#f10, #f20, #f30, #f40").addClass("svetloplavo");
                break;
            case 1:
                $("#f10, #f11, #f20, #f30").addClass("plavo");
                break;
            case 2: 
                $("#f30, #f10, #f20, #f31").addClass("narandzasto");
                break;
            case 3:
                $("#f30, #f20, #f21, #f31").addClass("zuto");
                break;
            case 4: 
                $("#f20, #f30, #f41, #f31").addClass("zeleno");
                break;
            case 5:
                $("#f20, #f30, #f40, #f31").addClass("ljubicasto");
                break;
            case 6:
                $("#f21, #f30, #f40, #f31").addClass("crveno");
                break;
        }
    }
    
    $(".nivo").click(function(){
        let id = this.id;
        if(id == "lako"){
            tezina = 1;
        } else if(id == "srednje"){
            tezina = 2;
        } else{
            tezina = 3;
        }
        localStorage.setItem("tezina",tezina);
    });


    $(".svetloplavo").dblclick(function(){
        elementi[0] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".plavo").dblclick(function(){
        elementi[1] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".narandzasto").dblclick(function(){
        elementi[2] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".zuto").dblclick(function(){
        elementi[3] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })


    $(".zeleno").dblclick(function(){
        elementi[4] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".ljubicasto").dblclick(function(){
        elementi[5] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })


    $(".crveno").dblclick(function(){
        elementi[6] = 0;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    });


    $(".svetloplavo").click(function(){
        elementi[0] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".plavo").click(function(){
        elementi[1] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".narandzasto").click(function(){
        elementi[2] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".zuto").click(function(){
        elementi[3] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })


    $(".zeleno").click(function(){
        elementi[4] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })

    $(".ljubicasto").click(function(){
        elementi[5] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    })


    $(".crveno").click(function(){
        elementi[6] = 1;
        localStorage.setItem("elementi",JSON.stringify(elementi));
    });

    $("#zapocni").click(function(){
        tezina = localStorage.getItem("tezina");
        elementi = JSON.parse(localStorage.getItem("elementi"));
        trenutni = Math.floor(Math.random()*7);
        while(elementi[trenutni] == 0) trenutni = Math.floor(Math.random()*7);
        sledeci = Math.floor(Math.random()*7) ;
        while(elementi[sledeci] == 0) sledeci = Math.floor(Math.random()*7);
        kreni(trenutni);
        prikazi();
        period = 440-tezina*40;
        funkcija_interval = setInterval(dole, period);
    });

    function kreni(broj){
        if(broj == 0){
            element = ["6-2", "7-2", "8-2", "9-2"];
        }
        else if(broj == 1){
            element = ["7-1", "7-2", "8-2", "9-2"];
        }
        else if(broj == 2){
            element = ["9-1", "7-2", "8-2", "9-2"];
        }
        else if(broj == 3){
            element = ["6-2", "7-2", "6-1", "7-1"];
        }
        else if(broj == 4){
            element = ["8-1", "9-1", "7-2", "8-2"];
        }
        else if(broj == 5){
            element = ["8-1", "7-2", "8-2", "9-2"];
        }
        else if(broj == 6){
            element = ["7-1", "8-1", "8-2", "9-2"];
        }

        for(let i = 0; i < 4; i++){
            if(document.getElementById(element[i]).className == "zauzeto"){
                izgubljeno = 1;
            }
            else{
                document.getElementById(element[i]).className = "trenutno";
            }
            
        }
    };

    function ponovi(){
        trenutni = sledeci;
        switch(trenutni){
            case 0:
                $("#f10, #f20, #f30, #f40").removeClass("svetloplavo");
                break;
            case 1:
                $("#f10, #f11, #f20, #f30").removeClass("plavo");
                break;
            case 2: 
                $("#f30, #f10, #f20, #f31").removeClass("narandzasto");
                break;
            case 3:
                $("#f30, #f20, #f21, #f31").removeClass("zuto");
                break;
            case 4: 
                $("#f20, #f30, #f41, #f31").removeClass("zeleno");
                break;
            case 5:
                $("#f20, #f30, #f40, #f31").removeClass("ljubicasto");
                break;
            case 6:
                $("#f21, #f30, #f40, #f31").removeClass("crveno");
                break;
        }
        sledeci = Math.floor(Math.random()*7);
        while(elementi[sledeci] == 0) sledeci = Math.floor(Math.random()*7);
        obrnuto = 0;
        prikazi();
        kreni(trenutni);
        if(!izgubljeno){
            funkcija_interval = setInterval(dole, period);
        }
        else{
            let ime = prompt("Izgubili ste!Unesite ime:");
            rezultati = JSON.parse(localStorage.getItem("rezultati"));
            rezultati.unshift({name:ime.toString(),value:Number(broj_poena)});
            rezultati.sort((a,b)=>b.value-a.value);
            localStorage.setItem("rezultati",JSON.stringify(rezultati));
            window.location.href = "tetris-rezultati.html";
        }
    };

    function dole(){
        let fleg = 1;
        for(let i = 0 ; i<4;i++){
            document.getElementById(element[i]).className = "polje";
            let tmp = element[i].split("-");

            novi[i] =  tmp[0] + "-" + (Number(tmp[1])+1).toString();
            if((document.getElementById(novi[i]).className == "zauzeto") || (Number(tmp[1]) + 1 == 21)){
                fleg = 0;
                break;
            }
        }
        if(fleg){
            for(let i = 0; i<4;i++){
                document.getElementById(novi[i]).className = "trenutno";
                element[i] = novi[i];
            }
        }else{
            for(let i = 0; i<4;i++){
                document.getElementById(element[i]).className = "zauzeto"
            }
            clearInterval(funkcija_interval);
            poeni();
            ponovi();
        }
    };


    function poeni(){
        for(let i = 20;i>0;i--){
            let flag = 1;
            for(let j = 1;j<11;j++){
                if(document.getElementById(j.toString()+"-"+i.toString()).className != "zauzeto"){
                    flag = 0;
                    break;
                }
            }
            if(flag){
                broj_poena++;
                for(let j = i;j>1;j--){
                    for(let k = 1;k<11;k++){
                        document.getElementById(k.toString()+"-" + j.toString()).className =
                        document.getElementById(k.toString()+"-"+(j-1).toString()).className
                    }
                }
                for(let k = 1;k<11;k++) document.getElementById(k.toString()+"-1").className = "polje";
                document.getElementById("broj_poena").innerHTML = "Broj poena: <br> " + broj_poena.toString();
                if(broj_poena % 5 == 0){
                    document.getElementById("nivo").innerHTML = "Nivo: <br> " + (broj_poena/5).toString();
                    period -= 40;
                }
            }
        }
    }

    $("#levo").click(function(){
        let flag = 1;
        for(let i = 0; i<4;i++){
            tmp = element[i].split("-");

            novi[i] = (Number(tmp[0])-1).toString() + "-"+ tmp[1];
            if((document.getElementById(novi[i]).className == "zauzeto") || (document.getElementById(novi[i]).className == "ivica")){
                flag = 0;
                break;
            }
        }
        if(flag){
            for(let i = 0; i < 4; i++){
                document.getElementById(element[i]).className = "polje";
                element[i] = novi[i];
                document.getElementById(element[i]).className = "trenutno";
            }
        }

    });

    $("#desno").click(function(){
        let flag = 1;
        for(let i = 0; i<4;i++){
            tmp = element[i].split("-");

            novi[i] = (Number(tmp[0])+1).toString() + "-"+ tmp[1];
            if((document.getElementById(novi[i]).className == "zauzeto") || (document.getElementById(novi[i]).className == "ivica")){
                flag = 0;
                break;
            }
        }
        if(flag){
            for(let i = 3; i >-1; i--){
                document.getElementById(element[i]).className = "polje";
                element[i] = novi[i];
                document.getElementById(element[i]).className = "trenutno";
            }
        }   
    })

    
    $("#dole").click(dole);

    $("#okreni").click(function(){
        let tmp = [];
        switch(trenutni){
            case 0: tmp = element[1].split("-");
            break;
            case 1: tmp = element[2].split("-");
            break;
            case 2: tmp = element[2].split("-");
            break;
            case 3: return;
            case 4: tmp = element[3].split("-");
            break;
            case 5: tmp = element[2].split("-");
            break;
            case 6: tmp = element[2].split("-");
            break;
        }
        px = Number(tmp[0]);
        py = Number(tmp[1]);
        let fleg = 1;
        for(let i = 0; i<4;i++){
            tmp = element[i].split("-");

            novi[i] = (px+py-Number(tmp[1])).toString() + "-" + (Number(tmp[0])+py-px).toString();
            if((document.getElementById(novi[i]).className == "zauzeto") || (document.getElementById(novi[i]).className == "ivica")){
                fleg = 0;
                break;
            }
        }
        if(fleg){
            for(let i = 3; i>=0;i--){
                $("#" + novi[3-i]).addClass("trenutno").removeClass("polje");
                $("#" + element[i]).addClass("polje").removeClass("trenutno");
                element[i] = novi[i];
            }
        }
    })
});