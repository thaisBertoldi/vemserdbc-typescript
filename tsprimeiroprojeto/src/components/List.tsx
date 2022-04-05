import { PeopleDTO } from "../models/PeopleDTO";

function List({ people }: PeopleDTO) {
  return (
    <div>
      {people.map((p) => (
        <div>
          <h1>{p.name}</h1>
          <p>{p.age}</p>
        </div>
      ))}
    </div>
  );
}

export default List;
