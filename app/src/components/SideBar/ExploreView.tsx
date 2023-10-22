import RedoRounded from '@mui/icons-material/RedoRounded';
import StopRounded from '@mui/icons-material/StopRounded';
import UndoRounded from '@mui/icons-material/UndoRounded';
import Button from '@mui/material/Button';
import Code from '../Code';
import {useAppSelector} from '../../hooks/useAppSelector';
import StackFunction from '../StackFunction';
import {useAppDispatch} from '../../hooks/useAppDispatch';
import {changeSidebarView} from '../../redux/base/baseSlice';
import {SideBarView} from './types';
import {exploreNextStep} from '../../redux/explore/exploreSlice';

function ExploreView() {
  const code = useAppSelector(
    state =>
      state.explore.codeMap[
        state.explore.steps[state.explore.currentStep].codeKey
      ]
  );
  const hlLines = useAppSelector(
    state => state.explore.steps[state.explore.currentStep].hlLines
  );
  const callStack = useAppSelector(
    state => state.explore.steps[state.explore.currentStep].callStack
  );

  const dispatch = useAppDispatch();

  const handlePreviousClick = () => {
    dispatch(exploreNextStep());
  };

  const handleStopClick = () => {
    dispatch(changeSidebarView(SideBarView.Structure));
  };

  const handleNextClick = () => {
    dispatch(exploreNextStep());
  };

  const stackFunctions = callStack.map(func => (
    <StackFunction code={func.code} done={func.done} />
  ));

  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3 flex flex-col">
      <div className="flex">
        <Button
          className="flex flex-col md:flex-row w-1/3 gap-2 py-2"
          onClick={handlePreviousClick}
        >
          <UndoRounded />
          <span>Previous</span>
        </Button>
        <Button
          className="flex flex-col md:flex-row w-1/3 gap-2 py-2"
          color="error"
          onClick={handleStopClick}
        >
          <StopRounded />
          <span>Stop</span>
        </Button>
        <Button
          className="flex flex-col-reverse md:flex-row w-1/3 gap-2 py-2"
          onClick={handleNextClick}
        >
          <span>Next</span>
          <RedoRounded />
        </Button>
      </div>

      <div className="no-scrollbar flex-1 space-y-5 overflow-auto p-3">
        <Code text={code} hlLines={hlLines} />
        <h4 className="font-permanent-marker m-0 font-normal">Call Stack</h4>
        {stackFunctions}
      </div>
    </aside>
  );
}

export default ExploreView;
