let stats = {
    "intelligence": 50,
    "energy": 50,
    "enjoyment": 50
}

const quotas = require("./quotas.json").main

var readline = require('readline-sync');
const fs = require('fs');

const log = (message) => console.log(message)

const playDay = (quota, daysPlayed) => {

    let hour = 9
    let playing = true


    log(`Day ${daysPlayed + 1} out of 7!`)
    log("Starting Stats:")

    while (hour < 24 && playing == true) {

        logStats(quota)
        log("")

        log(`It's ${hour}:00. \n`)

        log("1 = Study (1 hr)")
        log("2 = Nap (2 hrs)")
        log("3 = Play games (1 hr)")
        log("4 = Sleep for the day (next day)")
        const choice = readline.question("What do you want to do: ")

        if (choice == "1") {
            stats.intelligence += 5
            stats.energy -= 5
            hour += 1
            log("Intelligence increased!")
        }
        if (choice == "2") {
            stats.energy += 5
            hour += 2
            log("Energy increased!")
        }
        if (choice == "3") {
            stats.enjoyment += 5
            hour += 1
            log("Enjoyment increased!")
        }
        if (choice == "4") {
            playing = false;
            log("Going to sleep.. zzz..")
        }
        log("\n")
    }
    if (!(hour < 24 && playing == true)) {
        if (hour > 22) {
            log("You've recieved an energy penalty for tommorow based on your late sleep time!")
            stats.energy = 50 - (5 * (hour - 22))
        }
        else {
            stats.energy = 50
        }
        stats.enjoyment -= 20
        stats.intelligence -= 20
    }


}

const logStats = (quota) => {
    log(`Intelligence: ${stats.intelligence}/${quota.intelligence}`)
    log(`Energy: ${stats.energy}/${quota.energy}`)
    log(`Enjoyment: ${stats.enjoyment}/${quota.enjoyment}`)
}

const validateStats = (quota) => {
    let above = true
    if (stats.intelligence < quota.intelligence) above = false
    if (stats.energy < quota.energy) above = false
    if (stats.enjoyment < quota.enjoyment) above = false

}

const intro = async () => {

    const file = await fs.readFileSync('./intro.txt', 'utf8')
    log("")
    log(file)


    log("Welcome to Meet The Stats!\n")
    log("You'll start with 3 stats: intelligence, energy, and enjoyment.")
    log("You'll be given new quotas to fufill for each of these stats each year.")
    log("You can do tasks throughout the day to change these stats.")
    log("Beware staying up past 11PM as your energy will be lower the next day.\n")
}

intro()


for (let year = 0; year < 6; year++) {
    log(`Welcome to ${year + 2018}!!\n`)

    for (let day = 0; day < 7; day++) {
        playDay(quotas[year], day)
    }

    log("You ended the year with these stats: ")
    logStats(quotas[year])

    const statsValid = validateStats(quotas[year])

    if (statsValid) {
        if (!year == 5) {
            log("Moving onto the next year.. \n")
        }
        else {
            log("Somehow you made it.. good job...")
        }
    }
    else {
        log("It seems like you didn't meet the requirements.. too bad!!")
        year = 10;
    }

    stats = {
        "intelligence": 50,
        "energy": 50,
        "enjoyment": 50
    }
}