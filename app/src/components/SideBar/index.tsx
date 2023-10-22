import ChooseStructureView from './ChooseStructureView';
import ExploreView from './ExploreView';
import LoadingView from './LoadingView';
import StructureView from './StructureView';
import {useAppSelector} from '../../hooks/useAppSelector';
import {SideBarView} from './types';

function SideBar() {
  const sidebarView = useAppSelector(state => state.base.sidebarView);

  switch (sidebarView) {
    case SideBarView.ChooseStructure:
      return <ChooseStructureView />;
    case SideBarView.Structure:
      return <StructureView />;
    case SideBarView.Explore:
      return <ExploreView />;
    case SideBarView.Loading:
    default:
      return <LoadingView />;
  }
}

export default SideBar;
