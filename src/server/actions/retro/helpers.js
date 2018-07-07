import moment from 'moment';

export const calculateNewDeadline = (retro, retroStep, reset) => {
  let newDeadline = null;
  let currentStepTime = null;

  if (retro.allTime) {
    newDeadline = moment().add(retro.allTime, 'minutes');
  } else {
    if (retroStep === 'write') {
      currentStepTime = retro.writeTime;
    } else if (retroStep === 'vote') {
      currentStepTime = retro.voteTime;
    } else if (retroStep === 'take-actions') {
      currentStepTime = retro.reviewTime;
    } else {
      currentStepTime = retro.allTime;
    }

    if (!reset) {
      if (retroStep === 'write') {
        newDeadline = !retro.allTime
          ? moment().add(retro.writeTime, 'minutes')
          : moment().add(retro.allTime, 'minutes');
      }
      if (retroStep === 'vote') {
        newDeadline = !retro.allTime
          ? moment().add(retro.voteTime, 'minutes')
          : moment().add(retro.allTime, 'minutes');
      }
      if (retroStep === 'take-actions') {
        newDeadline = !retro.allTime
          ? moment().add(retro.reviewTime, 'minutes')
          : moment().add(retro.allTime, 'minutes');
      }
    } else {
      newDeadline = moment().add(currentStepTime, 'minutes');
    }
  }

  return newDeadline;
};
