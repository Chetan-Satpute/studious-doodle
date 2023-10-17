import Button from '@mui/material/Button';

import {Structure} from '../../lib/structure';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {chooseStructure} from '../../redux/thunks/chooseStructure';

function ChooseStructureView() {
  const dispatch = useAppDispatch();

  const handleButtonClick = (structure: Structure) => {
    dispatch(chooseStructure(structure));
  };

  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3 flex flex-col gap-5 p-3">
      <div className="p-3">
        <h2 className="text-lg m-0 text-center font-permanent-marker font-normal">
          Choose Structure
        </h2>
      </div>

      <div className="flex-1 flex gap-4 flex-col overflow-auto no-scrollbar">
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => handleButtonClick(Structure.Array)}
        >
          Array
        </Button>
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => handleButtonClick(Structure.LinkedList)}
        >
          Linked List
        </Button>
        <Button
          className="w-full"
          variant="outlined"
          onClick={() => handleButtonClick(Structure.BinarySearchTree)}
        >
          Binary Search Tree
        </Button>
      </div>
    </aside>
  );
}

export default ChooseStructureView;
