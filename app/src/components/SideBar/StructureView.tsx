import {Button} from '@mui/material';

import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeSidebarView} from '../../redux/base/baseSlice';
import {SideBarView} from './types';

function StructureView() {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    dispatch(changeSidebarView(SideBarView.ChooseStructure));
  };

  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3 flex flex-col-reverse lg:flex-col">
      <Button variant="text" className="w-full" onClick={handleClick}>
        Change Structure
      </Button>
      <div className="flex-1"></div>
    </aside>
  );
}

export default StructureView;
