"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const findTimetable_1 = require("../../permutator/findTimetable");
const testDataGenerator_1 = require("../../tests/testDataGenerator");
const turnOffSBCW_1 = require("../actions/turnOffSBCW");
const turnOnSBCW_1 = require("../actions/turnOnSBCW");
const masterState_1 = require("./../reducers/masterState");
describe("TurnOffSBCW action", () => {
    it("'s typename should be 'turn off search by considering week number'", () => {
        const action = new turnOffSBCW_1.TurnOffSBCW();
        chai_1.expect(action.TypeName()).to.eq("turn off search by considering week number");
    });
    it("should set SearchByConsideringWeekNumber to false ", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(true);
        newState = masterState_1.MasterStateReducer(newState, new turnOffSBCW_1.TurnOffSBCW());
        chai_1.expect(newState.SettingsState.SearchByConsideringWeekNumber).to.eq(false);
    });
    it("should set TimetableFinder to FindTimetableByConsideringWeekNumber", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.SettingsState.TimetableFinder.toString())
            .to.not.eq(findTimetable_1.FindTimetableWithoutConsideringWeekNumber.toString());
        newState = masterState_1.MasterStateReducer(newState, new turnOffSBCW_1.TurnOffSBCW());
        chai_1.expect(newState.SettingsState.TimetableFinder.toString())
            .to.eq(findTimetable_1.FindTimetableWithoutConsideringWeekNumber.toString());
    });
    it("should set RawSlotDataRouter to route from 'generalized' slot", () => {
        const initialState = testDataGenerator_1.GetMockInitialState();
        let newState = masterState_1.MasterStateReducer(initialState, new turnOnSBCW_1.TurnOnSBCW());
        chai_1.expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("ungeneralized");
        newState = masterState_1.MasterStateReducer(initialState, new turnOffSBCW_1.TurnOffSBCW());
        chai_1.expect(newState.DataState.RawSlotDataRouter.GetCurrentRoute()).to.eq("generalized");
    });
});
//# sourceMappingURL=_turnOffSBCW.test.js.map