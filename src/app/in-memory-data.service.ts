import { InMemoryDbService } from 'angular-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const todos = [
        {id: 1, task: "Wake up", completed: false}
    ];
    return {todos};
  }
}
