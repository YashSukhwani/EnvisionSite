class Club {
    constructor(club_name, playerCount, league) {
        this.name = club_name;
        this.playerCount = playerCount;
        this.league = league;
    }

    switchLeague(fromLeague = 'Prem', toLeague = 'Liga') {
        if (this.league == fromLeague) {
            this.league = toLeague;
            console.log(`League changed from ${fromLeague} to ${toLeague}.`);
        } else {
            console.log('Error! League could not be changed.');
        }
    }

    addPlayer = () => {
        this.playerCount++;
        console.log(`The new number of players is ${this.playerCount}.`);
    };
}

class Player extends Club {
    constructor(club_name, playerCount, league, player_name, age, natioanlity) {
        super(club_name, playerCount, league);
        this.player_name = player_name;
        this.age = age;
        this.natioanlity = natioanlity;
    }
}

const ManU = new Club('Machester United', 33, 'Prem');
ManU.addPlayer();
ManU.switchLeague('Prem', 'Liga');
ManU.switchLeague('Serie A', 'Bundesliga');

const ronaldo = new Player('Juventus', 18, 'Seria A', 'Cristiano Ronaldo', 34, 'Portuguese');
ronaldo.switchLeague('Serie A', 'Prem');