import React, { useContext } from "react"
import { Modal, Quote, ReadOnlyField } from "@components"
import { ModalContext, SelectedContext } from "../../context"
import { Assignment, Jtp } from "@src/models"
import { CalendarMonthOutlined, ClassOutlined, CoPresentOutlined } from "@mui/icons-material"
import { VariablesContainer, TagsContainer} from './styles'

export const AssignmentDetailModal = () => {
  const { isOpenAssignmentDetail, closeAssignmentDetail } = useContext(ModalContext)
  const { assignment } = useContext(SelectedContext)
  const _assignment = assignment && new Assignment(assignment)
  const jtp = assignment && new Jtp(assignment.jtp)

  return (
    <Modal
      onClose={() => { closeAssignmentDetail() }}
      open={isOpenAssignmentDetail}
      title={assignment?.description.short}
    >
      <Quote text={assignment?.description.long || ''} />
      <TagsContainer>
        <ReadOnlyField icon={<ClassOutlined />} label='Curso' text={_assignment?.json.course?.name} />
        { jtp && <ReadOnlyField icon={<CoPresentOutlined />} label='Responsable' text={jtp.fullName()} /> }
        <ReadOnlyField icon={<CalendarMonthOutlined />} label='Inicio' text={_assignment?.start} />
        <ReadOnlyField icon={<CalendarMonthOutlined />} label='Fin' text={_assignment?.end} />
      </TagsContainer>
      <VariablesContainer>
        <label>Variables de evaluación</label>
        <div>
          <ReadOnlyField color='unahurBlack' variant="filled" text={_assignment?.json.variables[0]} />
          <ReadOnlyField color='unahurBlack' variant="filled" text={_assignment?.json.variables[1]} />
          <ReadOnlyField color='unahurBlack' variant="filled" text={_assignment?.json.variables[2]} />
          <ReadOnlyField color='unahurBlack' variant="filled" text={_assignment?.json.variables[3]} />
          <ReadOnlyField color='unahurBlack' variant="filled" text={_assignment?.json.variables[4]} />
        </div>
      </VariablesContainer>
    </Modal>
  )
}