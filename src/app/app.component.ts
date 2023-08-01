import { Component, OnInit } from '@angular/core';

import { birdsData, Bird } from './birds';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    
    bird!: Bird;
    previusIndexes: number[] = [];
    commonNameAnswer: string = '';
    scientificNameAnswer: string = '';

    answered: boolean = false;
    isCommonNameCorrect: boolean = false;
    isScientificNameCorrect: boolean = false;
    isLoading: boolean = true;
    full: boolean = false;

    ngOnInit(): void {
        this.bird = this.getRandomBird()!;
    }

    calificar() {
        this.isCommonNameCorrect =
            this.commonNameAnswer.trim().toLowerCase() === this.bird.commonName.toLowerCase();

        this.isScientificNameCorrect =
            this.scientificNameAnswer.trim().toLowerCase() === this.bird.scientificName.toLowerCase();

        this.answered = true;
    }

    siguiente() {
        this.isLoading = true;
        this.bird = this.getRandomBird();
        this.answered = false;

        this.commonNameAnswer = "";
        this.scientificNameAnswer = "";
    }

    getRandomBird(): Bird {
        const length = birdsData.length;

        let randomIndex: number;
        do {
            randomIndex = Math.floor(Math.random() * length);
        } while(this.previusIndexes.includes(randomIndex));
        console.log(this.previusIndexes);
        console.log({ randomIndex });
        this.previusIndexes.push(randomIndex)
        
        if (this.previusIndexes.length === length) {
            this.full = true;
        }

        this.isLoading = false;
        
        return birdsData[randomIndex];
    }
}
