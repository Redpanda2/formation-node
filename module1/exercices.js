//Exercice 1
//Dans votre fichier index.js, créez une fonction qui appelle l'API de SWAPI et qui retourne Yoda

const axios = require('axios');

const fetchYoda = async () => {
    try{
        const response = await axios.get('https://swapi.dev/api/people/?search=yoda'); //people/?search=yoda people/20/
        console.log(response.data.results[0].name) 
    }
    catch (err) {
        console.log(err);
    }
}

    // fetchYoda();

// Exercice 2
// Créez une fonction qui retourne le nom de chaque espèce qui contient au moins 2 personnages

const fetchSpecies = async () => {
    try{
        const response = await axios.get('https://swapi.dev/api/species/'); 
        const { data } = response;
        let nextUrl = data.next;
        const totalSpecies = Math.floor(data.count / 10);
        console.log('Les especes qui contiennent au moins 2 personnages sont: ');
        printSpecies(data);
        for(let i = 0; i < totalSpecies; i++){
            const nextData = await fetchNextSpecies(nextUrl);
            nextUrl = nextData.next;
            printSpecies(nextData);
        }        
        // const speciesSup2 = species.filter(specie => specie.people.length > 1);
        // console.log(speciesSup2);
    }
    catch (err) {
        console.log(err);
    }
}

const printSpecies = (data) => {
    for(let specie of data.results){   
        specie.people.length > 1 ? console.log(specie.name) : 0 ;
    }
}

const fetchNextSpecies = async (url) => {
    const res = await axios.get(url);
    return res.data
}

// fetchSpecies();


// Exercice 3
// Créez une fonction qui retourne la somme des tailles (oui je sais, çà n'a aucun sens) de tous les humains

const nbrHumans = async () => {
    try{
        const response = await axios.get('https://swapi.dev/api/species/?search=Human'); 
        const humans = response.data.results;
        const allHumans = humans[0].people;
        // const testo = allHumans.map(human => axios.get(`${human}`));
      
        let height = 0;
        for(let human of allHumans){
            const test = await axios.get(`${human}`);
            //on additionne apres avoir parser les tailles qui sont des strings
            height += +test.data.height;
        }
        console.log(`La somme des tailles de tous les humains reunies est : ${height}`);
    }
    catch (err) {
        console.log(err);
    }
}

//  nbrHumans();


// Exercice 4
// Créez une fonction qui retourne un tableau de tous les tous les humains, contenant  le nom, la taille, le poids, le nom des films dans lesquels ils sont apparus et le nom de leur planète d'origine

const fetchHumans = async () => {
    try{
        const response = await axios.get('https://swapi.dev/api/species/?search=Human'); 
        const humans = response.data.results;
        const allHumans = humans[0].people;
        
        const humansArray = [];
        for(let human of allHumans){
            const test = await axios.get(`${human}`);
            humansArray.push(test.data);
        }
       
        const newArray = humansArray.map(human => {
            const humansObj = {};
            humansObj.name = human.name;
            humansObj.height = human.height;
            humansObj.mass = human.mass;
            humansObj.films = human.films;
            humansObj.homeworld = human.homeworld;
            return humansObj
        })
        console.log(newArray);
    }
    catch (err) {
        console.log(err);
    }
}

fetchHumans();
