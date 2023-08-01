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
        const { commonName, scientificName } = this.bird;
        
        this.isCommonNameCorrect = this.areEquivalentStrings(this.commonNameAnswer, commonName);
        this.isScientificNameCorrect = this.areEquivalentStrings(this.scientificNameAnswer, scientificName);
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

    areEquivalentStrings(s1: string, s2: string): boolean {
        s1 = s1.trim().toLowerCase()
            .replaceAll('á', 'a')
            .replaceAll('é', 'e')
            .replaceAll('í', 'i')
            .replaceAll('ó', 'o')
            .replaceAll('ú', 'u');
        s2 = s2.trim().toLowerCase()
            .replaceAll('á', 'a')
            .replaceAll('é', 'e')
            .replaceAll('í', 'i')
            .replaceAll('ó', 'o')
            .replaceAll('ú', 'u');

        return s1 === s2;
    }

    getImagePath(fileName: string): string {
        return 'assets/' + fileName;
    }
}
