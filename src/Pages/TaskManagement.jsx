import React from 'react';
import TaskBoard from './../components/TaskBoard';

const TaskManagement = () => {
    return (
        <div className="w-[95%] lg:max-w-[1200px] p-5 mx-auto">
            <TaskBoard></TaskBoard>
        </div>
    );
};

export default TaskManagement;