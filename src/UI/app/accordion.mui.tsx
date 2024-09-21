import * as React from 'react';
import { styled } from '@mui/material/styles';
import { IoIosArrowUp } from "react-icons/io";
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
    AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { TodoModelFullType } from '@/Type/type';
import { FaCircle } from 'react-icons/fa';
import { RxCounterClockwiseClock } from 'react-icons/rx';
import { convertDateAndTime } from '@/utils/time';
import clsx from 'clsx';
import { AccordionActions } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/redux/store';
import { setDrawerShow, setIndexForEdit } from '@/redux/slice/slice.app';
import { deleteTodo } from '@/redux/action/todo.action';

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

export default function AccordionComponent({ todo, index, expanded, handleChange }: { todo: TodoModelFullType, index: number, expanded: string; handleChange: (panel: string) => void }) {
    const state = useSelector((state: RootState) => state.TODO)
    const data = state.data
    const dispatch = useDispatch<AppDispatch>()
    const { date, time } = convertDateAndTime(todo.dateTime)
    const handleEdit = (index: number) => {
        dispatch(setDrawerShow(true))
        dispatch(setIndexForEdit(index))
    }
    const handleClick = (id: string) => {
        dispatch(deleteTodo(id, data))
    }

    return (
        <>
            <Accordion expanded={expanded === todo._id} onChange={(event, isExpanded) => handleChange(isExpanded ? todo._id : "")}>
                <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
                    <div className="flex justify-between w-full">
                        <Typography className="!text-xl capitalize">{todo.title}</Typography>
                        <div className='flex items-center gap-5'>
                            <Typography className='flex items-center gap-2 text-sm'><RxCounterClockwiseClock /><span>{todo.duration}s</span></Typography> |
                            <Typography className='flex items-center gap-2'>
                                <FaCircle size={8} style={{ color: typeof todo.listName === 'object' && todo.listName !== null ? todo.listName.color : todo.listName }} />
                                <span className='text-sm capitalize'> {typeof todo.listName === 'object' && todo.listName !== null ? todo.listName.listName : todo.listName}</span>
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
                <AccordionActions sx={{  backgroundColor: '#171618'}}>
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
            </Accordion>
        </>
    );
}
