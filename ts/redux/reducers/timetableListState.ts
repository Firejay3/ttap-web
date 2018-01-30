import * as typeName from "type-name";
import { CreateGeneralizedSlots, IGeneralizedSlot } from "../../model/generalizedSlot";
import { RawSlot } from "../../model/rawSlot";
import { STCBox } from "../../model/states/stcBox";
import { GeneralizeSlot } from "../../permutator/generalizeSlot";
import {Action} from "../actions/action";
import {Timetable} from "./../../model/timetable";

export interface ITimetableListState {
    CurrentIndex:       number;
    FiltrateTimetables: Timetable[];
    IsSummaryOpen:      boolean;
    ResidueTimetables:  Timetable[];
    CurrentSlots: IGeneralizedSlot[];
}

export function NewTimetableListState(timetables: Timetable[], selectedSlots?: RawSlot[]) : ITimetableListState {
    const currentSlot = selectedSlots ?
        CreateGeneralizedSlots(GeneralizeSlot(selectedSlots)) :
        null;
    return {
        CurrentIndex: 0,
        FiltrateTimetables: timetables,
        IsSummaryOpen: false,
        ResidueTimetables: [],
        CurrentSlots: currentSlot
    };
}

export abstract class TimetableListStateAction extends Action < ITimetableListState > {
    public StateName() {
        return typeName(NewTimetableListState(null, null));
    }
}
