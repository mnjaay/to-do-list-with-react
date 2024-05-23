import { toHaveStyle } from '@testing-library/jest-dom/dist/matchers';
import './App.css';
import { useState } from 'react';

function App() {
  const [data, setData] = useState([
    { id: 1, nom: 'Faire les courses', description: 'Acheter des fruits, légumes, lait, pain, et des œufs.', statut: false },
    { id: 2, nom: 'Nettoyer la maison', description: 'Passer l\'aspirateur dans le salon et les chambres, nettoyer la cuisine et les salles de bains.', statut: false },
    { id: 3, nom: 'Préparer le dîner', description: 'Cuisiner un repas équilibré avec du poulet, des légumes et du riz.', statut: false },
    { id: 4, nom: 'Faire du sport', description: 'Aller courir pendant 30 minutes au parc.', statut: false },
    { id: 5, nom: 'Lire un livre', description: 'Lire au moins 50 pages du livre en cours.', statut: false },
    { id: 6, nom: 'Travailler sur le projet', description: 'Compléter le module d\'authentification pour l\'application.', statut: false },
    { id: 7, nom: 'Appeler la famille', description: 'Appeler les parents pour prendre des nouvelles.', statut: false },
    { id: 8, nom: 'Faire la lessive', description: 'Laver et plier les vêtements.', statut: false },
    { id: 9, nom: 'Planifier la semaine', description: 'Préparer le planning et les tâches pour la semaine prochaine.', statut: false },
    { id: 10, nom: 'Regarder un film', description: 'Regarder un nouveau film ou un épisode de série.', statut: false }

  ]);
  const [nom, setNom] = useState(null);
  const [description, setDescription] = useState(null);
  const [id, setId] = useState(null);

  const [statut, setStatut] = useState(false);

  const [state, setState] = useState(false);
  const [state1, setState1] = useState(false);


  const ChangeState = () => {
    setState(!state);
  };
  const ChangeState1 = () => {
    setState1(!state1);
  };



  const AddTask = () => {
    const newTask = {
      id: data.length ? data[data.length - 1].id + 1 : 1,
      nom: nom,
      description: description,
      statut: 0
    };
    setData([...data, newTask]);
    setNom('');
    setDescription('');
    setState(false);
  };

  const handleDeleteTask = (idTask) => {
    setData(data.filter((d) => d.id !== idTask))
  }

  const taskDone = (idTask) => {
    setData(data.map((task) =>
      task.id === idTask ? { ...task, statut: !statut } : task
    ));
  };

  const [searchValue, setSearchValue] = useState('');
  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };


  const tasks = data ? data.filter((d) => {
    if (searchValue === "") {
      return true; // Show all tasks if no filter is applied
    } else {
      return d.statut.toString() === searchValue; // Filter tasks based on the selected status
    }
  }) : [];

  const taskView = (id, nom, description, statut) => {
    console.log(id, nom, description, statut)
    setId(id)
    setNom(nom)
    setDescription(description)
    setStatut(statut)
    setState1(!state1);


  }

  const updateTsk = () => {
    setData(
      data.map((d) =>
        d.id === id ? {
          id: id,
          nom: nom,
          description: description,
          statut: statut
        } : d
      )

    )
    setState1(false);
  }


  return (
    <div>
      <div className="text-gray-900 bg-gray-200 m-20">
        <div className="p-4 flex justify-between">
          <div>
            <h1 className="text-3xl">
              TO-DO-LIST
            </h1>
          </div>
          <div>
            <button onClick={ChangeState} className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="button">
              <svg width="25" height="25" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.25c-5.376 0-9.75 4.374-9.75 9.75s4.374 9.75 9.75 9.75 9.75-4.374 9.75-9.75S17.376 2.25 12 2.25Zm3.75 10.5h-3v3a.75.75 0 1 1-1.5 0v-3h-3a.75.75 0 1 1 0-1.5h3v-3a.75.75 0 1 1 1.5 0v3h3a.75.75 0 1 1 0 1.5Z"></path>
              </svg>
            </button>
          </div>
        </div>
        {state &&
          <div id="crud-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Creation d'une nouvelle activité
                  </h3>
                  <button onClick={ChangeState} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={(e) => { e.preventDefault(); AddTask(); }}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'Activité</label>
                      <input type="text" name="nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom de l'activite" required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Ajouter une activite
                  </button>
                </form>
              </div>
            </div>
          </div>
        }
         {state1 &&
          <div id="crud-modal" className="fixed top-0 right-0 left-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
            <div className="relative p-4 w-full max-w-md max-h-full">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Modification d'une activité
                  </h3>
                  <button onClick={()=>ChangeState1(null,null,null,null)} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                </div>
                <form className="p-4 md:p-5" onSubmit={(e) => { e.preventDefault(); updateTsk(); }}>
                  <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                      <label htmlFor="nom" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nom de l'Activité</label>
                      <input type="text" name="nom" id="nom" value={nom} onChange={(e) => setNom(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Nom de l'activite" required />
                    </div>
                    <div className="col-span-2">
                      <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                      <textarea id="description" rows="4" value={description} onChange={(e) => setDescription(e.target.value)} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Description"></textarea>
                    </div>
                  </div>
                  <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd"></path></svg>
                    Modifier une activite
                  </button>
                </form>
              </div>
            </div>
          </div>
        }

        <div className="px-3 py-4 flex justify-center">
          <table className="w-full text-md bg-white shadow-md rounded mb-4">
            <tbody>
              <tr className="border-b">
                <th className="text-left p-3 px-5">Nom de L'Activité</th>
                <th className="text-left p-3 px-5">Description</th>
                <th>    <div>
                  <label htmlFor="dropdown">Statut...</label>
                  <select id="dropdown" value={searchValue} onChange={handleSearchChange} >
                    <option value="">Tout</option>
                    <option value="false">A faire</option>
                    <option value="true">Deja fait</option>
                  </select>

                </div>
                </th>
              </tr>
              {tasks.map((item) => (
                <tr key={item.id} className="border-b hover:bg-orange-100 bg-gray-100">

                  <td className={`p-3 px-5 ${item.statut === true ? 'line-through' : ''}`}>{item.nom}</td>
                  <td className={`p-3 px-5 ${item.statut === true ? 'line-through' : ''}`}>{item.description}</td>
                  <td className="p-3 px-5 flex justify-end">

                    <button type="button" className="mr-3 text-sm bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => taskDone(item.id)}><svg width="25" height="25" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m21.75 6-10.5 12-4.5-4.5"></path>
                      <path d="m6.75 18-4.5-4.5"></path>
                      <path d="m17.25 6-6.375 7.313"></path>
                    </svg></button>

                    <button type="button" className="mr-3 text-sm bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => taskView(item.id, item.nom, item.description, item.statut)}>
                    <svg width="25" height="25" fill="#ffffff" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
  <path d="M4.828 21.754H2.25v-2.579L16.788 4.602l2.614 2.614L4.828 21.754Z"></path>
  <path d="m19.956 6.656-2.612-2.612 1.484-1.437c.229-.23.58-.357.906-.357a1.214 1.214 0 0 1 .864.357l.797.797a1.213 1.213 0 0 1 .355.862c0 .328-.127.677-.357.907l-1.437 1.483Z"></path>
</svg></button>

                    <button type="button" className="text-sm bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded focus:outline-none focus:shadow-outline" onClick={() => handleDeleteTask(item.id)}><svg width="25" height="25" fill="none" stroke="#ffffff" stroke-linecap="round" stroke-linejoin="round" stroke-width="1" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="m5.25 5.25.938 15c.044.867.675 1.5 1.5 1.5h8.625c.828 0 1.447-.633 1.5-1.5l.937-15"></path>
                      <path d="M3.75 5.25h16.5"></path>
                      <path d="M9 5.25V3.375a1.122 1.122 0 0 1 1.125-1.125h3.75A1.121 1.121 0 0 1 15 3.375V5.25"></path>
                      <path d="M12 8.25v10.5"></path>
                      <path d="M8.625 8.25 9 18.75"></path>
                      <path d="M15.375 8.25 15 18.75"></path>
                    </svg></button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
