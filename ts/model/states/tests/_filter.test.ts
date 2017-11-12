import { expect } from "chai";
import { Filter } from "../filter";
import { GetTestTimetables1 } from "./../../../tests/testDataGenerator";
import { State, StateKind } from "./../state";

const state1 = new State(StateKind.MaybeOccupied, 0, 16, null); // Monday 10.00 am to 10.30 am
const state2 = new State(StateKind.MaybeOccupied, 2, 16, null); // Wednesday 10.00 am to 10.30 am
const timetables = GetTestTimetables1();

describe("Filter()", () => {
    it("should throw error if state kind is not MaybeOccupied", () => {
        expect(() => {Filter(timetables, new State(StateKind.DefinitelyUnoccupied, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.DefinitelyOccupied, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.Clicked, null, null, null)); }).to.throw();
        expect(() => {Filter(timetables, new State(StateKind.MaybeOccupied, null, null, null)); }).to.not.throw();
    });

    it("should return a tuple : [filtrate, residue]", () => {
        const result = Filter(timetables, state1);
        expect(result.length).to.eq(2);
    });

    it("case 1", () => {
        const [filtrate, residue] = Filter(timetables, state1);
        expect(filtrate.length).to.eq(24);
        expect(residue.length).to.eq(5);
    });

    it("case 2", () => {
        const [filtrate1, residue1] = Filter(timetables, state1);
        const [filtrate2, residue2] = Filter(filtrate1, state2);
        expect(filtrate2.length).to.eq(16);
        expect(residue1.length + residue2.length).to.eq(13);
    });
});
