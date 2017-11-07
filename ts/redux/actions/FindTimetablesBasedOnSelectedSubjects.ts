import {
    RawSlot
} from "./../../model/rawSlot";
import {
    Timetable
} from "./../../model/timetable";
import {
    FindTimetable
} from "./../../permutator/findTimetable";
import {
    TimetableListState
} from "./../reducers/timetableListState";

import {
    ParseRawSlotToSlot
} from "../../parser/parseRawSlotToSlot";
import {
    ParseSlotToTinySlot
} from "../../parser/parseSlotToTinySlot";
import {
    ISubjectListState,
    SubjectListStateAction
} from "./../reducers/subjectListState";

export class FindTimetablesBasedOnSelectedSubjects extends SubjectListStateAction {
    public constructor() {
        super();
    }
    public TypeName(): string {
        return "Find Timetables";
    }
    protected GenerateNewState(state: ISubjectListState): ISubjectListState {
        const selectedSubjects = state.Subjects.filter((x) => x.IsSelected);
        const hashIds = [].concat.apply([], selectedSubjects.map((x) => x.SlotIds));
        const rawSlots = RawSlot.GetBunch(hashIds);
        const slots = ParseRawSlotToSlot(rawSlots);
        const tinySlots = ParseSlotToTinySlot(slots);
        const rawTimetables = FindTimetable(tinySlots);
        const timetables = rawTimetables.map((x) => {
            return new Timetable(RawSlot.GetBunch(x));
        });
        return {
            ...state,
            TimetableListState: new TimetableListState(timetables)
        };
    }
}
