import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Template from '../../components/template/Template';
import TaskRegistration from '../task_manager/TaskRegistration';

const ScreenA = ({ onSkip }) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <h1>Screen A</h1>
    <button onClick={onSkip}>Skip</button>
  </motion.div>
);

const TaskRegistrationScreen = (props) => (
  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
    <TaskRegistration redirectPage={props.redirectPage}/>
  </motion.div>
)

const ContentArea = (props) => {
  const [currentScreen, setCurrentScreen] = useState('UserSetting');

  const handleSkip = () => {
    if (currentScreen === 'UserSetting') {
      setCurrentScreen('TaskRegistration');
    }
  };

  return (
    <div className="app">
      {currentScreen === 'UserSetting' && <ScreenA onSkip={handleSkip} />}
      {currentScreen === 'TaskRegistration' && <TaskRegistrationScreen redirectPage={props}/>}
    </div>
  );
};

const TaskIntroduction = (props) => {
  return (
    <Template>
      <ContentArea redirectPage={props.redirectPage} />
    </Template>
  );
}

export default TaskIntroduction;