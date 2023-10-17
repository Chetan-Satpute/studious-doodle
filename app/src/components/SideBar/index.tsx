import ChooseStructureView from './ChooseStructureView';
import LoadingView from './LoadingView';
import {useAppSelector} from '../../hooks/useAppSelector';

import {SideBarView} from './types';
import StructureView from './StructureView';

function SideBar() {
  const sidebarView = useAppSelector(state => state.base.sidebarView);

  switch (sidebarView) {
    case SideBarView.ChooseStructure:
      return <ChooseStructureView />;
    case SideBarView.Structure:
      return <StructureView />;
    case SideBarView.Loading:
    default:
      return <LoadingView />;
  }
}

export default SideBar;
