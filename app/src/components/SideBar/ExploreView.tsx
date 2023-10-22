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
import {CircularProgress} from '@mui/material';

function ExploreView() {
  const currentStepIndex = useAppSelector(state => state.explore.currentStep);
  const steps = useAppSelector(state => state.explore.steps);
  const codeMap = useAppSelector(state => state.explore.codeMap);
  const dispatch = useAppDispatch();

  const currentStep = steps[currentStepIndex];

  if (currentStep === null) {
    return null;
  }

  const nextStep = steps[currentStepIndex + 1];

  const code = codeMap[currentStep.codeKey];
  const hlLines = currentStep.hlLines;
  const callStack = currentStep.callStack;

  const handlePreviousClick = () => {
    dispatch(exploreNextStep());
  };

  const handleStopClick = () => {
    dispatch(changeSidebarView(SideBarView.Structure));
  };

  const handleNextClick = () => {
    dispatch(exploreNextStep());
  };

  const stackFunctions = callStack.map((func, index) => (
    <StackFunction key={index} code={func.code} done={func.done} />
  ));

  return (
    <aside className="h-3/5 w-full lg:h-full lg:w-1/3 flex flex-col">
      <div className="flex">
        <Button
          className="flex flex-col md:flex-row w-1/3 gap-2 py-2"
          onClick={handlePreviousClick}
          disabled={currentStepIndex === 0}
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
          disabled={!nextStep}
        >
          <span>Next</span>
          {nextStep === null ? <CircularProgress size={15} /> : <RedoRounded />}
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
