import '@testing-library/jest-dom';
import { it, expect } from 'vitest';
import { AxiosResponse } from 'axios';
import PeopleTable from '../PeopleTable';
import { MemoryRouter } from 'react-router-dom';
import { render, fireEvent, waitFor, screen } from '@testing-library/react';

import StarWarsService from '../../../../services/star-wars-service';
import StarWarsCharacter from '../../../../interfaces/star-wars-character';

describe('PeopleTable', async () => {
    const originalFunction = StarWarsService.getCharactersAsync

    StarWarsService.getCharactersAsync = (page: number) => {
        return Promise.resolve({
            status: 200,
            statusText: 'OK',
            headers: {},
            config: {
                method: 'GET',
                url: `https://swapi.dev/api/people?page=${page}`,
                headers: {
                    'Content-Type': 'application/json'
                },
            },
            data: {
                count: 1,
                next: null,
                previous: null,
                results: [
                    {
                        name: 'Yazan Jarrar',
                        gender: 'male',
                        height: '183',
                        eye_color: 'blue',
                    } as StarWarsCharacter
                ],
            },
        } as AxiosResponse)

    }
    it('renders without crashing', () => {
        render(
            <MemoryRouter>
                <PeopleTable />
            </MemoryRouter>
        );
        expect(screen.getByLabelText('Search')).toBeInTheDocument();
    });

    it('changes value when search input changes', async () => {
        render(
            <MemoryRouter>
                <PeopleTable />
            </MemoryRouter>
        );
        const input = screen.getByLabelText('Search');
        fireEvent.change(input, { target: { value: 'Luke' } });
        await waitFor(() => expect((input as HTMLInputElement).value).toBe('Luke'));
    });

    it('renders table headers correctly', () => {
        render(
            <MemoryRouter>
                <PeopleTable />
            </MemoryRouter>
        );
        expect(screen.getByText('Name')).toBeInTheDocument();
        expect(screen.getByText('Gender')).toBeInTheDocument();
        expect(screen.getByText('Height')).toBeInTheDocument();
        expect(screen.getByText('Eye Color')).toBeInTheDocument();
        expect(screen.getByText('Action')).toBeInTheDocument();
    });

    it('renders row retrived correctly', async () => {
        render(
            <MemoryRouter>
                <PeopleTable />
            </MemoryRouter>
        );
        await waitFor(() => {
            expect(screen.getByText('Yazan Jarrar')).toBeInTheDocument();
            expect(screen.getByText('male')).toBeInTheDocument();
            expect(screen.getByText('183')).toBeInTheDocument();
            expect(screen.getByText('blue')).toBeInTheDocument();
            expect(screen.getByText('Details')).toBeInTheDocument();
        });
    });

    afterAll(() => {
        StarWarsService.getCharactersAsync = originalFunction;
    });
});
