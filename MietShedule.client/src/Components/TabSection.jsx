import Button from "./Button/Button"

export default function TabSection({ activeTab, OnChange }) {
    return (
        <section>
            <Button active={activeTab == 'shedule'} onClick={() => OnChange('shedule')}>Расписание</Button>
            <Button active={activeTab == 'teacher'} onClick={() => OnChange('teacher')}>Поиск преподавателя</Button>
            <Button active={activeTab == 'export'} onClick={() => OnChange('export')}>Экспорт расписания</Button>
        </section>
    )
}