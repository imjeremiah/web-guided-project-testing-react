import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

import { fetchMissions as mockFetchMissions } from './api/fetchMissions';
jest.mock('./api/fetchMissions');

test('Renders by default without errors', () => {
    render(<App />);
});

test('When button is clicked, 3 missions are displayed', async () => {

    mockFetchMissions.mockResolvedValueOnce({
        data: [
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
        ]
    });

    // 1. ARRANGE: Renders App
    render(<App />);

    // 2. ACT
    // - Find Button
    const button = screen.getByRole(/button/i);
    // - Click Button
    userEvent.click(button);

    // 3. Assert
    // - Find all mission items
    const missions = await screen.findAllByTestId(/mission/i);
    // - There shiould be 10
    expect(missions).toHaveLength(3);
})