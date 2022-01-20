import React from "react";
import { render, screen } from "@testing-library/react";
import MissionForm from "./MissionForm";
import userEvent from "@testing-library/user-event";

test('Renders by default without errors', () => {
    render(<MissionForm />);
});

test('Renders loading message when isFetchingData === true', () => {
    // 1. ARRANGE: Render Component.
    render(<MissionForm isFetchingData={true} />);

    // 2. ACT: Find 'we are fetching data' statement.
    const fetching = screen.getByText(/we are fetching data/i);
    const button = screen.queryByRole('button');

    // 3. ASSERT: Confirm that loading statement exists.
    expect(fetching).toBeInTheDocument();
    expect(button).not.toBeInTheDocument();
});

test('Renders button when isFetchingData === false', () => {
    // 1. ARRANGE: Render Component.
    render(<MissionForm isFetchingData={false} />);

    // 2. ACT: Find button.
    const button = screen.getByRole('button');

    // 3. ASSERT: Confirm that button exists.
    expect(button).toBeInTheDocument();
});

test('Execute getData when button is clicked', () => {
    const mockGetData = jest.fn();

    // 1. ARRANGE: Render Component with isFetchingData === false.
    render(<MissionForm isFetchingData={false} getData={mockGetData}/>);

    // 2. ACT: 
    // - Find button.
    const button = screen.getByRole('button');
    // - Click button.
    userEvent.click(button);

    // 3. ASSERT:
    expect(mockGetData.mock.calls.length).toBe(1);
    expect(mockGetData.mock.calls).toHaveLength(1);
    expect(mockGetData).toBeCalledTimes(1);
});