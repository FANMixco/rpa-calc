import { MSParser } from './msparser';

export class GetCleanData {
    copy:any;
    msParser:MSParser;

    constructor(copy:any) {
        this.copy = copy;
        this.msParser = new MSParser();
    }

    getPerFlow() {
        this.copy.Prices.perFlow.notes[0] = this.msParser.cleanPerFlowPlan(this.copy.Prices, 0, "flows", "users");
        return this.copy;
    }

    getPerUser() {
        this.copy.Prices.perUserPlan.notes[0] = this.msParser.cleanPerUserPlan(this.copy.Prices.perUserPlan, 0)
        return this.copy;
    }

    getPerUserPlanWithRPA() {
        this.copy.Prices.perUserPlanWithRPA.notes[0].notes[0] = this.msParser.cleanPerUserPlanWithRPA(this.copy.Prices.perUserPlanWithRPA, "flows", 0, 0);

        this.copy.Prices.perUserPlanWithRPA.notes[0].notes[1] = this.msParser.cleanPerUserPlanWithRPA(this.copy.Prices.perUserPlanWithRPA, "attendedBot", 0, 1);
    
        this.copy.Prices.perUserPlanWithRPA.notes[0].notes[2] = this.msParser.cleanPerUserPlanWithRPA(this.copy.Prices.perUserPlanWithRPA, "aiCredits", 0, 2);
    
        return this.copy;
    }

    getNotes() {
        this.copy.Notes[3] = this.msParser.cleanCommonNotes(this.copy, 3, "DB", "Files");

        return this.copy;
    }
}
