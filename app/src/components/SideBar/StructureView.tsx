import {Button} from '@mui/material';

import FunctionCard from '../FunctionCard';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeSidebarView} from '../../redux/base/baseSlice';
import {SideBarView} from './types';
import {useAppSelector} from '../../hooks/useAppSelector';

function StructureView() {
  const dispatch = useAppDispatch();
  const functionList = useAppSelector(state => state.structure.functionList);

  const handleClick = () => {
    dispatch(changeSidebarView(SideBarView.ChooseStructure));
  };

  const functionCardList = functionList.map(info => (
    <FunctionCard
      key={info.id}
      name={info.name}
      id={info.id}
      args={info.args}
    />
  ));

  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3 flex flex-col-reverse lg:flex-col">
      <Button variant="text" className="w-full" onClick={handleClick}>
        Change Structure
      </Button>
      <div className="flex-1 p-3">{functionCardList}</div>
    </aside>
  );
}

export default StructureView;
