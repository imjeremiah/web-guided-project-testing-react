import React from "react";
import { render, screen } from "@testing-library/react";
import MissionsList from './MissionsList';
import userEvent from "@testing-library/user-event";

test('Renders by default without errors', () => {
    render(<MissionsList missions={[]}/>);
});

const testMissions = [
    {
        mission_name: 'Mission 1',
        mission_id: '1'
    },
    {
        mission_name: 'Mission 2',
        mission_id: '2'
    },
    {
        mission_name: 'Mission 3',
        mission_id: '3'
    },
];

test('Renders new tests when passed into component', () => {
    // 1. ARRANGE 1: renders MissionsList with no mission
    const { rerender } = render(<MissionsList missions={[]}/>);

    // 2. ACT 1: gets the missions from our component
    let missions = screen.queryAllByTestId(/mission/i);

    // 3. ASSERT 1: checks that no missions are on the screen
    expect(missions).toHaveLength(0);

    // 4. ARRANGE 2: renders MissionsList with 3 missions
    rerender(<MissionsList missions={testMissions}/>);

    // 5. ACT 2: gets the missions form our component
    missions = screen.queryAllByTestId(/mission/i);

    // 6. ASSERT 2: checks that 3 missions are on the screen
    expect(missions).toHaveLength(3);
})