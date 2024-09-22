import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IoIosArrowUp } from "react-icons/io";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import BasicAccordion from '@mui/material/Accordion';
import BasicSummary from '@mui/material/AccordionSummary';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TodoModelFullType } from '@/Type/type';
import { FaCircle } from 'react-icons/fa';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { convert24HourTimeStringToTimestamp, convertDateAndTime } from '@/utils/time';
import clsx from 'clsx';
import { AccordionActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setDrawerShow, setIndexForEdit } from '@/redux/slice/slice.app';
import { deleteTodo, updateComplete } from '@/redux/action/todo.action';
import Todo from '@/models/todo.mode';

const Accordion = styled((props: AccordionProps) => (
    <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
    border: `1px solid #171618`,
    color: '#fff',
    '&:not(:last-child)': {
        borderBottom: 0,
    },
    '&::before': {
        display: 'none',
    },
}));

const AccordionSummary = styled((props: AccordionSummaryProps) => (
    <MuiAccordionSummary
        expandIcon={<IoIosArrowUp color='#fff' fontSize="0.9rem" />}
        {...props}
    />
))(({ theme }) => ({
    backgroundColor: '#171618',
    flexDirection: 'row-reverse',
    '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
        transform: 'rotate(90deg)',
    },
    '& .MuiAccordionSummary-content': {
        marginLeft: theme.spacing(1),
    },
    ...theme.applyStyles('dark', {
        backgroundColor: 'rgba(255, 255, 255, .05)',
    }),
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    backgroundColor: '#171618',
    padding: theme.spacing(2),
    borderTop: '1px solid #fff',
}));

const useAlarmer = (todo: TodoModelFullType, setComplete: React.Dispatch<React.SetStateAction<boolean>>) => {
    const [start, setStart] = React.useState<boolean>(false);
    const [count, setCount] = React.useState<number>(Number(todo.duration));
    const [currentTime, setCurrentTime] = React.useState<number>(new Date().getTime());

    const dispatch = useDispatch<AppDispatch>()

    React.useEffect(() => {
        const intervalId = setInterval(() => {
            setCurrentTime(new Date().getTime());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    React.useEffect(() => {
        const todoTime = convert24HourTimeStringToTimestamp(todo.dateTime);
        const timeDifference = todoTime - currentTime;

        if (timeDifference <= 0 && !start) {
            setStart(true);
        } else {
            const timeId = setTimeout(() => {
                setStart(true);
            }, timeDifference);

            return () => clearTimeout(timeId);
        }
    }, [todo, currentTime]);

    React.useEffect(() => {
        if (start && count > 0) {
            const countdownId = setInterval(() => {
                setCount(prevCount => prevCount - 1);
            }, 1000);

            return () => clearInterval(countdownId);
        }
        if (start && count === 0 && !todo.completed) {
            setComplete(true);
            dispatch(updateComplete(todo._id))
        }
    }, [start, count, setComplete]);

    return { start, count };
};

export default function AccordionComponent({ todo, index, expanded, handleChange }: { todo: TodoModelFullType, index: number, expanded: string; handleChange: (panel: string) => void }) {
    const [complete, setComplete] = React.useState<boolean>(false);

    const state = useSelector((state: RootState) => state.TODO);
    const stateApp = useSelector((state: RootState) => state.APP);
    const data = state.data;
    const active = stateApp.activeSet;
    const dispatch = useDispatch<AppDispatch>();
    const { date, time } = convertDateAndTime(todo.dateTime);

    const { start, count } = useAlarmer(todo, setComplete);

    const handleEdit = (index: number) => {
        dispatch(setDrawerShow(true));
        dispatch(setIndexForEdit(index));
    };

    const handleClick = (id: string) => {
        dispatch(deleteTodo(id, data));
    };

    return (
        <>
            {((complete || todo.completed) && active !== "completed") ? (
                <BasicAccordion expanded={false} onChange={() => { }} className="!bg-success !rounded-none">
                    <BasicSummary>
                        <div className="uppercase text-xl font-bold text-center w-full">
                            completed
                        </div>
                    </BasicSummary>
                </BasicAccordion>
            ) : (
                <Accordion expanded={expanded === todo._id} onChange={(event, isExpanded) => handleChange(isExpanded ? todo._id : "")}>
                    <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                        <div className="flex justify-between w-full">
                            <Typography className="!text-xl capitalize">{todo.title}</Typography>
                            <div className='flex items-center gap-5'>
                                {active === "completed" ? (
                                    <div className='bg-success text-success-content font-bold text-sm uppercase px-3 tracking-wider'>Compeleted</div>
                                ) :
                                    (<Typography className='flex items-center gap-2 text-sm'>
                                        <RxCounterClockwiseClock />
                                        {start
                                            ? ` ${count}s`
                                            : ` ${todo.duration}s`
                                        }
                                    </Typography>)}
                                |
                                <Typography className='flex items-center gap-2'>
                                    <FaCircle size={8} style={{ color: typeof todo.listName === 'object' && todo.listName !== null ? todo.listName.color : todo.listName }} />
                                    <span className='text-sm capitalize'>
                                        {typeof todo.listName === 'object' && todo.listName !== null ? todo.listName.listName : todo.listName}
                                    </span>
                                </Typography>
                            </div>
                        </div>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography className="flex justify-between items-center">
                            <span className="space-x-5 text-sm">
                                <span>{date}</span>
                                <span>{time}</span>
                            </span>
                            <span className={clsx("uppercase font-medium px-3 text-sm tracking-wider", {
                                "bg-red-500": todo.priority === "high",
                                "bg-green-500": todo.priority === "medium",
                                "bg-yellow-500": todo.priority === "low"
                            })}>{todo.priority}</span>
                        </Typography>
                        <Typography className='first-letter:capitalize'>
                            {todo.description}
                        </Typography>
                    </AccordionDetails>
                    <AccordionActions sx={{ backgroundColor: '#171618' }}>
                        <button
                            type="button"
                            className='btn btn-sm rounded'
                            onClick={() => handleEdit(index)}
                        >
                            Edit
                        </button>
                        <button
                            type="button"
                            className='btn btn-sm rounded'
                            onClick={() => handleClick(todo._id)}
                        >
                            Delete
                        </button>
                    </AccordionActions>
                </Accordion >
            )
            }
        </>
    );
}
