import Couple from "./Couple";
import "./TeacherSection.css"
import { useCallback, useEffect, useState } from "react";


export default function TeacherSection() {
    const defaultPeriod = 7
    const endDateDefault = new Date()
    endDateDefault.setDate(endDateDefault.getDate() + defaultPeriod)

    const [shedule, setShedule] = useState()
    const [teacher, setTeacher] = useState('')
    const [teacherList, setTeacherList] = useState()
    const [startDate, setStartDate] = useState((new Date()).toISOString().split('T')[0])
    const [endDate, setEndDate] = useState(endDateDefault.toISOString().split('T')[0])
    const [invalidTeacher, setInvalidTeacher] = useState(false)

    const fetchTeacherList = useCallback(async () => {
        const teacherListResponse = await fetch("Teachers")
        if (teacherListResponse.status == 200) {
            const teachers = await teacherListResponse.json()
            setTeacherList(teachers)
        }
    }, [])

    const fetchShedule = useCallback(async () => {
        if (teacher.length != 0) {
            const formattedStartDate = new Date(startDate).toLocaleDateString("en-GB")
            const formattedEndDate = new Date(endDate).toLocaleDateString("en-GB")
            const sheduleResponse = await fetch(`Shedule/teacher/${teacher}?startDate=${formattedStartDate}&endDate=${formattedEndDate}`)

            if (sheduleResponse.status == 200) {
                const sheduleRecords = await sheduleResponse.json()
                setShedule(sheduleRecords)
            }
        }
    }, [teacher, startDate, endDate])

    useEffect(() => {
        fetchTeacherList()
    }, [])

    useEffect(() => {
        if (teacherList != undefined && teacherList.includes(teacher)) {
            fetchShedule()
            setInvalidTeacher(false)
        }
        else {
            setShedule(undefined)
            if (teacher.length != 0) {
                setInvalidTeacher(true)
            }
        }
    }, [teacher, startDate, endDate, teacherList])

    function keyExtractor(couple) {
        return `${couple.name}-${couple.date}-${couple.teacher}-${couple.order}-${couple.auditorium}-${couple.group}`;
    }

    return (
        <section className="shedule_section">
            {teacherList != undefined &&
                <>
                    <div>
                        <input className={invalidTeacher ? "error-input" : ""} id="teacher_input" type="text" list="teachers" value={teacher} onChange={(event) => setTeacher(event.target.value)} />
                    </div>
                    <datalist id="teachers">
                        {teacherList.map(g => <option key={g}>{g}</option>)}
                    </datalist>
                    <div>
                        <input type="date"
                            value={startDate}
                            onChange={(event) => setStartDate(event.target.value)}>
                        </input>
                    </div>
                    <div>
                        <input type="date"
                            value={endDate}
                            onChange={(event) => setEndDate(event.target.value)}>
                        </input>
                    </div>
                </>
            }


            {shedule != undefined &&
                shedule.map(c =>
                    <Couple key={keyExtractor(c)} {...c}></Couple>
                )
            }

            {
                shedule != undefined && shedule.length == 0 &&
                <h2>Нет занятий</h2>
            }

        </section>
    )
}