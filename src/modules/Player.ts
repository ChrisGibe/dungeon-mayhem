interface Effects {
    target: string;
    type: string;
    value: number;
}

interface Card {
    id: string;
    effects: Effects[];
}

export class Player {
    name: string;
    id: number;
    character: string;
    deck: Card[];
    hp: number;
    armor: number;
    hand : Card[];
    discard: Card[];

    constructor(name: string, id: number, character: string) {
        this.name = name;
        this.id = id;
        this.character = character;
        this.deck = [];
        this.hp = 10;
        this.armor = 0;
        this.hand = [];
        this.discard = [];
    }

    get currentHp() {
        return this.hp;
    }

    get currentArmor() {
        return this.armor;
    }

    get currentDiscard() {
        return this.discard;
    }

    set startingHang(shuffleDeck: Card[]) {
        const shuffleDeckSliced = shuffleDeck.slice(0, 7);
        this.hand = [...shuffleDeckSliced]
        console.log(this.hand, 'Starting hand')
    }

    set currendHand(card: Card) {
        this.hand.push(card);
    }

    async fetchDeck() {
        try {
            const response = await fetch(`https://chrisgibe.github.io/data/characters/${this.character}.json`);
            const result = await response.json();
            this.deck = [...result.deck];
        }catch {
            console.error(`Error during fetch deck for ${this.character}`)
        }
    }

    playCard(id: string) {
        const card = this.deck.find((element: Card) => id === element.id);
        
        if(card) {
            card.effects.forEach(effect => {
                if(effect.type === 'damage') {
                    console.log(`Met ${effect.value} damage à Sutha`)
                }

                if(effect.type === 'heal') {
                    console.log(`${this.character} ce heal de ${effect.value}`)
                }
            });
        }
    }

    // Fonction get from this codepen of Courey wong https://codepen.io/coureywong/pen/OJqbdmb?editors=1111 (Thank you !)
    shuffleDeck() {
        const shuffleDeck = [...this.deck]
        let i = shuffleDeck.length, j, temp;

        while (--i > 0) {
            j = Math.floor(Math.random () * (i+1));
            temp = shuffleDeck[j];   
            shuffleDeck[j] = shuffleDeck[i];
            shuffleDeck[i] = temp;
        }

        return shuffleDeck
    }

    startingHand() {
        const deckShuffle = this.shuffleDeck();
        const shuffleDeckSliced = deckShuffle.slice(0, 7);
        this.hand = [...shuffleDeckSliced]
    }
}