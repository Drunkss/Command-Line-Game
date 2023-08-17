#!/usr/bin/env node

import chalk from "chalk"
import inquirer from "inquirer"
import chalkAnimation from "chalk-animation"
import figlet from "figlet"
import { createSpinner } from "nanospinner"
import gradient from "gradient-string"

let playerName

const sleep = (ms = 2000) => new Promise((r) => setTimeout(r,ms))

async function welcome(){
    const rainbowTitle = chalkAnimation.rainbow(
        'who wants to be a Javascript Millionaire? \n'
    )

    await sleep()
    rainbowTitle.stop()

    console.log(`
        ${chalk.bgBlueBright('HOW TO PLAY')}

        I am a process on your computer.
        If ou get any question wrong I will be ${chalk.bgRedBright('KILLED')}
        so get all questions right :).

    `)
}

async function askName(){
    const answers = await inquirer.prompt({
        name: 'player_name',
        type: 'input',
        message: 'What is your name?',
        default() {
            return 'Player'
        },
    })

    playerName = answers.player_name
}

async function question1(){
    const answers = await inquirer.prompt({
        name: 'question_1',
        type: 'list',
        message: 'Javascript was created in 10 days then released on \n',
        choices: [
            'May 23rd, 1995',
            'Nov 24th, 1995',
            'Dec 4th, 1995',
            'Dec 17, 1996',
        ]
    })

    return handleAnswer(answers.question_1 == 'Dec 4th, 1995')
}

async function handleAnswer(isCorrect) {
    const spinner = createSpinner('Checking answer...')

    await sleep()

    if (isCorrect) spinner.success({ text: `Nice work ${playerName}. that's a legit answer :)`}) && winner
        else spinner.error({ text: `💀💀 Game over bozo, you lose ${playerName}! 💀💀`}) && await sleep() && console.clear() && process.exit(1)

}

async function winner(){
    console.clear()

    const msg = `Congrats, ${playerName} !\n $ 1 , 0 0 0 , 0 0 0`
    figlet(msg, ( err, data ) => {
        console.log(gradient.pastel.multiline(data))
    })
}

await welcome()

await askName()

await question1()
