import { String } from 'typescript-string-operations';

export class MSParser {

    totalUnlimited(total:number):string {
        return total === -1 ? "Unlimited" : total.toString();
    }

    cleanPerUserPlan(plan:any, note:number):string {
        return String.Format(plan.notes[note], this.totalUnlimited(plan.flows));
    }

    cleanPerUserPlanWithRPA(plan:any, key:string, note:number, innerNote: number):string {
        return String.Format(plan.notes[note].notes[innerNote], this.totalUnlimited(plan[key]));
    }

    cleanCommonNotes(ms:any, note:number, dbKey:string, dbFile:string):string {
        const totalDB = this.totalUnlimited(ms.CommonDataService[dbKey]);
        const totalFile = this.totalUnlimited(ms.CommonDataService[dbFile]);

        return String.Format(ms.Notes[note], totalDB, totalFile);
    }

    cleanPerFlowPlan(plan:any, note:number, flowKey:string, userKey:string):string {
        const totalFlow = this.totalUnlimited(plan.perFlow[flowKey]);
        const totalUser = this.totalUnlimited(plan.perFlow[userKey]);

        return String.Format(plan.perFlow.notes[note], totalFlow, totalUser)
    }
}
