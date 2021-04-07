//// create a class called subject that contains a field called status that is calculated based on:
////Their moral straits:mentalStrength,(based ont those calculate mental health),happines and intelligence
////Their physical traits such as strength and health
////also include stats based on those fields such as:strong(if the subject has great strength),inteligent (if the subject has high IQ),resilient(if the person has both great health and great mentalHealth),mentally ill if the person's ,ental health is low
//todo work on the stats system
//? What do you want to happen each day?
//implementing a way to empty an array
//!Functionality
let currentDay = 1;
let positiveActions = 0;
let negativeActions = 0;
function talkTo(subjectIndex, talkIntesity) {
  subjects[subjectIndex].happines += talkIntesity;
}
const summaryFragments = {
  starters: {
    normal:
      "Today was a normal day.Although there were no cases of violence of any kind we can see the anger build up.Violence is expected in the near future",
    tensioned:
      "Today the subjects showed a little bit of tension: some of the subjects got into a fight,a verbal one.One of the subjects involved seems to be personally offended and affected by what was said.Among the things that were said we could distinguish :racial slurs,comments about the other physique and intelligence etc.",
    peaceful:
      "Today was a peaceful day.The subjects behaved perfectly:no size of physical or verbal violence,long periods of silence and even small talks between the subjects could be observed",
    violent:
      "Today was a violent day.Some physical conflicts could be seen between certain subjects.This resulted in injuries on both sides,although one of the involved parts was more injured than the other"
  },
  mid: {
    normal:
      "Some of the subjects can be seen standing alone while others continuously question the reason of their presence here.Again we can see frustration building up wich can lead to violece in the near future",
    tensioned:
      "Because of the tension of today we can see a decrease in the general stress and anxiety levels of the subjects.Even the anger levels were somewhat decreased.The next days are expected to be more peaceful and silent altough the subjects can make us a surprise",
    peaceful:
      "We have signs of small friendships and low-level bonds between the subjects.Though they are not expected to last long,the subjects involved benefited a lot from the social interactions of today:their levels of anger decreased,the general levels of anger also decreased and,as a result of that we do not expect any significant violent acts in the near future",
    violent:
      "There were some injuries that were a result of today's acts of violence.Some of them are,from what we can see,severe but most of them are mild and consisting of scratches and bruises.We are not sure of the severity of their wounds because the subjects were not subjected to any sor of medical examination,we only have indicators og their general health wich seems to have been seriously affected as a result of the acts of violence of today"
  },
  conclusios: {
    normal:
      "Today's Conclusions : No subjects were harmed today.Violence is expected soo.n",
    tensioned: "Verbal violence was the main kind of interactiom today.",
    peaceful:
      "The subjects seem pleased by the amount of social-interaction they showed today.",
    violent: "Physical violence was the main kind of interaction today."
  }
};
const possibleStats = {
  strong: "Strong",
  intelligent: "Intelligent", //done
  resilient: "Resilient",
  mentallyIll: "Mentally Ill",
  depressive: "Depressive",
  sick: "Sick",
  severelySsick: "Severely sick",
  angry: "Angry",
  sad: "Sad",
  dead: "Dead"
};

class Subject {
  constructor(mentalStrength, happines, intelligence, strength, health) {
    this.mentalStrength = mentalStrength;
    this.happines = happines;
    this.intelligence = intelligence;
    this.strength = strength;
    this.health = health;
    this.mentalHealth =
      (6 * this.happines + 2 * this.mentalStrength + 2 * this.health) / 10;
    this.anger = 50; //*Anybody starts with the same anger base level so that the effects of staing in the same room are equal for them
    this.stats = [];
    this.chattedToday = false; //*make sure a person has a single talk for a day so that this system doesn't become overkill and everyone gets happy instantly
    this.todaysInteraction = 0; //in what way you interacted to somebody. EXample: talked to,beaten,etc...
    this.todaysAction = 5; //what action did you make today
    this.yesterdaysAction;
  }
  //making this a method instead of an actual function because it's easier to work with data from inside the function and

  subjectNumber() {
    this.subjectNo = subjects.indexOf(this) + 1;
  }
  updateStats(array) {
    let placeholder = "";
    let stats = document.querySelector(`#stats-${array.indexOf(this)}`);
    //console.log(stats);
    if (this.intelligence > 75) this.stats.push(possibleStats.intelligent);
    if (this.strength > 60 && this.mentalStrength > 70)
      this.stats.push(possibleStats.resilient);
    else if (this.strength > 60) {
      this.stats.push(possibleStats.strong);
    }
    if (this.happines < 25) this.stats.push(possibleStats.depressive);
    else if (this.happines < 50) this.stats.push(possibleStats.sad);
    if (this.anger > 75) this.stats.push(possibleStats.angry);
    if (this.mentalHealth < 25) this.stats.push(possibleStats.mentallyIll);
    if (this.health < 25) this.stats.push(possibleStats.severelySsick);
    else if (this.health < 50) this.stats.push(possibleStats.sick);
    //console.log(this.stats.length);
    for (let i = 0; i < this.stats.length; i++) {
      this.stats[i] = this.stats[i] + " <br> ";
      //console.log(this.stats[i]);
      placeholder += this.stats[i];
    }
    stats.innerHTML = placeholder;
  }
  getHurt(damage) {
    if (this.health >= 0) {
      let realDamage = damage - this.strength / 20;
      this.health -= realDamage;
    }
  }
  die() {
    let stats = document.querySelector(`#stats-${this.subjectNo - 1}`);
    stats.innerHTML = possibleStats.dead;
    negativeActions++;
  }
  getSad(stress) {
    if (this.happines >= 0) {
      let stressEffect = Math.floor(stress - this.mentalStrength / 20); //*How much the subject is affected by stress
      this.happines -= stressEffect;
    }
  }
  getAngry(anger) {
    if (this.anger >= 0) {
      let realAnger = anger - this.mentalStrength / 20;
      this.anger += realAnger;
      this.mentalHealth -= realAnger;
      this.happines -= realAnger / 2; //*When you get angry,your happiness decreases
    }
  }
  meditate() {
    if (this.anger >= 25) {
      this.anger -= 25;
    }
    if (this.happines < 60) {
      this.happines += 20;
    }
    if (this.mentalStrength < 55) {
      this.mentalStrength += 5;
    }
    if (this.health < 30) {
      this.health += 10;
    }
  }
  beat(targetIndex) {
    if (targetIndex !== subjects.indexOf(this)) {
      if (this.strength > subjects[targetIndex].strength) {
        subjects[targetIndex].health -= 10 + this.strength / 10;
        subjects[targetIndex].happines -= 20; //*You are not going to be happy when you get beaten down
        subjects[targetIndex].anger = 100 - subjects[targetIndex].anger; //You get frustrated when you get angry
        this.anger -= 20; //*you relief your anger when you beat somebody
      } else if (this.strength < subjects[targetIndex].strength) {
        this.health -= 10 + subjects[targetIndex].strength / 10; //*If your target is stronger than you.you are going to be the one who gets hurt
        this.anger -= 20;
        this.happines -= 25;
        this.mentalHealth -= 15; //*you lose a lot of self esteem when you get beaten down bu the oponent that you choose
      }
    }
    negativeActions++;
  }
  commitSuicide() {
    if (this.health < 15) {
      this.die(subjects);
    } else {
      this.health -= 5;
      this.mentalHealth -= 10;
      this.happines -= 5;
    }
    negativeActions++;
  }
  removeStats() {
    this.stats.splice(0, this.stats.length);
  }
  decideActions(subjectsArray) {
    let minimalHappiness = 100; //*start with the biggest value possible then sort trough it to fin the actual minuimal happiness
    let saddestPersonIndex;

    let minimalStrength = 100;
    let weakestPerson;
    let maximumStrength = 0;
    let strongestPersonIndex;

    const randomIndex = Math.floor(Math.random() * 10 + 1);
    const randomIndex2 = Math.floor(Math.random() * 15 + 1); //generate a random number from 1 to 10 so that there is a 10% chance to humiliate the weakest person in the room
    //generate a rondom target amongst all the subjects

    const randomTarget = Math.floor(Math.random() * subjectsArray.length); //*Not adding 1 at the end cuz since this is an index and not a chance we want the number to range from 0 to 3

    for (let i = 0; i < subjectsArray.length; i++) {
      //find the saddest person in the room
      if (subjectsArray[i].happines < minimalHappiness) {
        minimalHappiness = subjectsArray[i].happines;
        saddestPersonIndex = i;
      }

      //find the eakest person in the room
      if (subjectsArray[i].strength < minimalStrength) {
        minimalStrength = subjectsArray[i].strength;
        weakestPerson = i;
      }
      if (subjectsArray[i].strength > maximumStrength) {
        maximumStrength = subjectsArray[i].strength;
        strongestPersonIndex = i;
      }
    }

    const possibleActions = {
      giveSmallTalk: 5,
      giveMediumTalk: 7,
      giveDeepTalk: 10,
      makeAJoke: 12,
      tease: -2,
      yell: -5,
      humiliate: -20
    };

    //!Common behavior for all of the subjects
    if (this.anger > 75 && this.intelligence > 85) {
      this.beat(randomTarget); //*When you are excessively angry you tend to not be rational.You also tend to search for trouble and for conflicts,no matter who it is
    }
    if (currentDay > 15) {
      this.getSad(currentDay - 5);
    }
    if (
      (this.happines < 25 && this.mentalStrength < 50) ||
      this.mentalHealth < 45
    ) {
      if (randomIndex2 === 5) {
        this.commitSuicide();
        alert("tried to kill myself homie " + this.subjectNo);
      }
    }
    //!Behaviour of an intelligent person
    if (
      this.intelligence >= 75 &&
      this.intelligence < 90 &&
      this.chattedToday === false
    ) {
      if (
        this.happines > 75 &&
        this.mentalHealth > 45 &&
        this.health > 30 &&
        this.yesterdaysAction != possibleActions.makeAJoke
      ) {
        this.todaysAction = possibleActions.makeAJoke;
      } else if (
        this.happines > 60 &&
        this.mentalHealth > 45 &&
        this.mentalStrength > 65 &&
        this.health > 30 &&
        this.yesterdaysAction != possibleActions.giveDeepTalk
        //*If you are happy and mentally healthy and strong and psysically healthy talk deep with that person
      ) {
        this.todaysAction = possibleActions.giveDeepTalk;
        this.getSad(12); //*when you start talking deep with somebody that is sad,it'll make you sad too
        this.mentalStrength -= 5; //*Youy also become more senstive
      } else if (
        this.happines > 50 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 65 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveMediumTalk
      ) {
        this.todaysAction = possibleActions.giveMediumTalk;
        this.getSad(8); //when you talk to somebody that is sad you become sad
      } else if (
        this.happines > 45 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 50 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveSmallTalk
      ) {
        this.todaysAction = possibleActions.giveSmallTalk;
      }
      if (
        this.intelligence > subjects[weakestPerson] &&
        this.mentalStrength > subjects[weakestPerson] &&
        this.anger > 70
      ) {
        this.todaysAction = possibleActions.humiliate;
      } else {
        //*Do nothing
        this.todaysAction = 5;
        this.meditate();
      }

      if (this.happines < 25) {
        this.meditate(); //*Smart persons know how to deal with depression
      }
    } else if (
      this.intelligence >= 50 && //!Behaviour of a medium intelligence person
      this.intelligence < 75 &&
      this.chattedToday === false
    ) {
      if (
        this.happines > 75 &&
        this.mentalHealth > 45 &&
        this.health > 30 &&
        this.yesterdaysAction != possibleActions.makeAJoke
      ) {
        this.todaysAction = possibleActions.makeAJoke;
      }

      //*No deep talks,only smart person can perform deep talks(not very realistic but  there has to be a way of nerfing the happiness system)
      else if (
        this.happines > 50 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 65 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveMediumTalk
      ) {
        this.todaysAction = possibleActions.giveMediumTalk;
        this.getSad(8); //when you talk to somebody that is sad you become sad
      } else if (
        this.happines > 45 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 50 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveSmallTalk
      ) {
        this.todaysAction = possibleActions.giveSmallTalk;
      }
      //*no humiliation,you need a high level of intelligence to be able to humiliate somebody you just met(you also need high levels of perception wich is a trait of intelligent people)
    } else if (
      this.intelligence >= 0 && //!Behaviour of a dumb person
      this.intelligence < 50 &&
      this.chattedToday === false
    ) {
      if (
        this.happines > 75 &&
        this.mentalHealth > 45 &&
        this.health > 30 &&
        this.yesterdaysAction != possibleActions.makeAJoke
      ) {
        let randomPossibility = Math.floor(Math.random() * 4 + 1);
        if (randomPossibility !== 1) {
          //if the number randomyl chosem from 1 to 4 is not 1 then make a joke(the chance is 25%)
          this.todaysAction = possibleActions.makeAJoke;
        } else {
          this.getSad(10);
        }
      } //*dumb persons can still make jokes but if they are not good they can end up lowering their self esteem thus reducing their happiness levels(they have a 25% chance of making a bad joke)
      else if (
        this.happines > 45 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 50 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveSmallTalk
      ) {
        this.todaysAction = possibleActions.giveSmallTalk;
      } else {
        this.todaysAction = 1;
        //!DO nothing if you are not suitable for those actions
        this.getSad(2);
        this.getAngry(5);
        //*When you do nothing you tend to build up anger and get sad
      }

      if (randomIndex === 5 || randomIndex === 2) {
        this.beat(weakestPerson);
      } else if (randomIndex === 3) {
        this.beat(strongestPersonIndex); //they are dumn enough to try to beat the strongest person in the room
      } //*Dumb person are going to try to make themselves feel better by beating the weakest person in the room
    } else if (this.intelligence >= 90 && this.chattedToday === false) {
      //!behaviour of a genius
      //*geniuses don't make jokes as they don't feel like they need to make other feel good
      if (
        this.happines > 60 &&
        this.mentalHealth > 45 &&
        this.mentalStrength > 65 &&
        this.health > 30 &&
        this.yesterdaysAction != possibleActions.giveDeepTalk
        //*If you are happy and mentally healthy and strong and psysically healthy talk deep with that person
      ) {
        this.todaysAction = possibleActions.giveDeepTalk;
        this.getSad(12); //*when you start talking deep with somebody that is sad,it'll make you sad too
        this.mentalStrength -= 5; //*Youy also become more senstive
      } else if (
        this.happines > 50 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 65 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveMediumTalk
      ) {
        this.todaysAction = possibleActions.giveMediumTalk;
        this.getSad(8); //when you talk to somebody that is sad you become sad
      } else if (
        this.happines > 45 &&
        this.mentalHealth > 30 &&
        this.mentalStrength > 50 &&
        this.health > 20 &&
        this.yesterdaysAction != possibleActions.giveSmallTalk
      ) {
        this.todaysAction = possibleActions.giveSmallTalk;
      } else {
        //*Do nothing
        this.todaysAction = 5;
        this.meditate();
      }
      if (
        this.intelligence > subjects[weakestPerson] &&
        this.mentalStrength > subjects[weakestPerson] &&
        (randomIndex === 5 || //!Geniuses have a 40% chnace of humiliating other people
          raandomIndex === 6 ||
          randomIndex === 1 ||
          radnomIndex === 2) &&
        this.anger > 70
      ) {
        this.todaysAction = possibleActions.humiliate;
      }

      if (this.happines < 25) {
        this.meditate(); //*Smart persons know how to deal with depression
      }
    }
    this.yesterdaysAction = this.todaysAction; //set tthe yesterday's action to be the action you performed today each day so that it is updated after deciding the action

    //Acting based on the decisions
    if (
      (this.chattedToday === false &&
        subjects[weakestPerson].chattedToday === false &&
        randomIndex2 === 3) ||
      randomIndex2 === 4 ||
      randomIndex2 === 5
    ) {
      this.todaysAction = -7;
      talkTo(weakestPerson, this.todaysAction); //make the weakest person feel bad
      console.log("suck it you weak punk");
    } else if (
      this.chattedToday === false &&
      subjects[saddestPersonIndex].chattedToday === false
    ) {
      //if the saddes person in the room hasn't talked to anybody yet,talk to that person
      talkTo(saddestPersonIndex, this.todaysAction);
      subjects[saddestPersonIndex].chattedToday = true; //that means that this person has chatted today and now that option is locked for today
      this.chattedToday = true;
      console.log("Amtalkingm8");
    }

    if (this.todaysAction < 0) {
      negativeActions++;
    } else {
      positiveActions++;
    }
  }
}

const subjects = [
  new Subject(90, 90, 90, 90, 90),
  new Subject(80, 80, 80, 80, 80),
  new Subject(100, 100, 100, 100, 100),
  new Subject(10, 10, 10, 10, 10)
];

//! **********UI*********
/*
 giveSmallTalk: 5,
      giveMediumTalk: 7,
      giveDeepTalk: 10,
      makeAJoke: 12,
      tease: -2,
      yell: -5,
      humiliate: -20
*/
const DOM = {
  nextDayBtn: document.querySelector("#nextDay"),
  currentDay: document.querySelector("#currentDay"),
  summary: document.querySelector("#summary"),
  stats: document.querySelector("#stats")
};
function decideAndUpdateSummary(array) {
  let summary = DOM.summary;
  array.forEach(cur => {
    //console.log(cur);

    console.log(`today ${negativeActions} bad things happened`);
    console.log(`today ${positiveActions} good shit happened`);
    //update the summary
    if (positiveActions > negativeActions) {
      if (positiveActions <= 3) {
        summary.innerHTML = `${summaryFragments.starters.normal} <br> ${
          summaryFragments.mid.normal
        } <br> ${summaryFragments.conclusios.normal}`;
      } else if (positiveActions >= 4) {
        summary.innerHTML = `${summaryFragments.starters.peaceful} ${
          summaryFragments.mid.peaceful
        } ${summaryFragments.conclusios.peaceful}`;
      }
    } else if (negativeActions > positiveActions) {
      if (negativeActions <= 3) {
        summary.innerHTML = `${summaryFragments.starters.tensioned} ${
          summaryFragments.mid.tensioned
        } ${summaryFragments.conclusios.tensioned}`;
      } else if (negativeActions >= 4) {
        summary.innerHTML = `${summaryFragments.starters.violent} ${
          summaryFragments.mid.violent
        } ${summaryFragments.conclusios.violent}`;
      }
    } else {
      summary.innerHTML = summary.innerHTML = `${
        summaryFragments.starters.normal
      } <br> ${summaryFragments.mid.normal} <br> ${
        summaryFragments.conclusios.normal
      }`;
    }
    //*update current day
    DOM.currentDay.innerHTML = ` Day ${currentDay}`;
  });
}

//generate a randomm target : Math.floor(Math.random() * subjects.length + 1)

//!Global Controller

function setupEventListeners() {
  DOM.nextDayBtn.addEventListener("click", nextDay);
  document.addEventListener("keydown", event => {
    if (event.keyCode === 13) nextDay();
  });
}
function nextDay() {
  updateEachDay(subjects);
  decideAndUpdateSummary(subjects);
  currentDay++;
  console.log(`today is ${currentDay}`);
  //todo update the today's summary here
}
function init(array) {
  array.forEach(cur => {
    cur.updateStats(array);
    cur.decideActions(array);
    cur.subjectNumber();
    console.log(cur.stats);
  });
  setupEventListeners();
}
function updateEachDay(array) {
  positiveActions = 0;
  negativeActions = 0;
  array.forEach(cur => {
    cur.chattedToday = false;
    if (cur.health <= 0) cur.die();
    cur.removeStats();
    cur.updateStats(array);
    cur.subjectNumber();
    cur.decideActions(array);
    if (cur.anger < 95) {
      cur.anger += 5; //*Everyday the subjects get more and more angry
    }
    //todo uncomment later cur.decideActions();
    //todo uncomment later cur.behavior(subjects);
  });
}
init(subjects);
