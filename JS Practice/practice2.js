let counter = 0;
for (let counter = 0; counter < 5; counter++) {
    console.log(counter);
}

// next part

const footy_pair = {
    agent: 'Carlos',
    financer: ['Sanchez', 'Pogba'],
    payBill: function() {
        agentName = () => {
            console.log(`Agent name is ${this.agent}`);
        }
        console.log(`Financer has paid the agent's bill for the month`);
        agentName();
    }
}

const {
    agent,
    financer
} = footy_pair;

console.log(agent, financer);

// next part - Commented out because there isn't a definition for the function shown

/*
button.addEventListener(click, function() {
    var addFade = () => {
        this.style.display = 'None';
        // Using the arrow function ensures that your reference remains button and not addFade
    }
});
*/

// next part

const addAge = (age) => {
    age++;
    console.log(`Age is now ${age}`);
}

addAge(32);

// next part

const listItems = ['Maruchan', 'Pasta', 'Eggs', 'Sandwich', 'Muffin'];

listItems.forEach((meal, index) => {
    console.log(`The item with index ${index} is ${meal}`);
});

const newList = listItems.map((item) => {
    return item = 'Meal: ' + item; // will not work without the return statement
});

console.log(newList);

const Filtered = listItems.filter((item) => {
    return item.charAt(0) == 'M'; // === means operand type as well as contents match
});

console.log(Filtered);

// next step

console.log(`Start Timer`);

// a promise is an operation that is going to finish in the future
const prom = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(500); // 500 is the data being sent back
    }, 2000);
});

prom.then(data => {
        console.log(data);
    })
    .catch(error => {
        console.log(`Something went wrong with the promise`);
    });

console.log(`End Timer`);