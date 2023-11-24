import { Input, Select, Segmented, Button, Checkbox } from 'antd'
import React from 'react'

const QuestionAns = ({ question, questions, children }) => {
  //console.log('Question', questions)
  return (
    <li style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
      <span>
        {children}
        {'Омтетить как ответ'}
        <Checkbox
          onChange={() => {
            const result = questions.find((record) => record.name === question.name)
            ///console.log('result', result, );
            result['isAns'] = !result?.isAns
          }}
        />
      </span>
    </li>
  )
}

export default ({ subjects }) => {
  const [data, setData] = React.useState({ questionType: 1 })
  const [questionType, setQuestionType] = React.useState(1)
  const [questions, setQuestions] = React.useState([])
  const [question, setQuestion] = React.useState('')

  const filterOption = (input: string, option?: { label: string; value: string }) =>
    (option?.label ?? '').toLowerCase().includes(input.toLowerCase())

  const renderVariants = () => {
    return (
      <ul>
        {questions.map((question, index) => (
          <QuestionAns onRender={setData} question={question} questions={questions} key={index}>
            {question.name}
          </QuestionAns> // Используйте <li> вместо <div> для списка элементов
        ))}
      </ul>
    )
  }

  const testConstructor = () => {
    switch (data?.questionType) {
      case 1:
        return (
          <div style={{ width: '100%' }}>
            {renderVariants()}
            <Input
              value={question}
              onChange={(event) => setQuestion(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === 'Enter' && question.trim()) {
                  setQuestions((prev) => [...prev, { name: question, isAns: false }])
                  setQuestion('')
                }
              }}
            />
          </div>
        )
      case 2:
        console.log('222')
        break
      case 3:
        console.log('333')
        break
      default:
        break
    }
  }

  return (
    <div
      style={{
        width: '30rem',
        height: '80vh',
        border: '1px solid #C3C3C3',
        padding: '2rem',
        borderRadius: '0.4rem',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'start',
        alignItems: 'center',
      }}>
      <span>Конструктор теста</span>
      <div style={{ width: '24rem', marginBottom: '1rem' }}>
        <label htmlFor='testName'>Введите название теста</label>
        <Input
          name='testName'
          value={data?.testName ?? ''}
          onChange={(event) => setData({ ...data, testName: event.target.value })}
          placeholder={'Название теста'}
        />
      </div>
      <div style={{ width: '24rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column' }}>
        <label htmlFor='subjectName'>Выберите тест</label>
        <Select
          name='subjectName'
          showSearch
          filterOption={filterOption}
          onChange={(value) => setData({ ...data, subjectType: value })}
          options={[
            { value: 1, label: 'Первый' },
            { value: 2, label: 'Второй' },
          ]}
        />
      </div>
      <div style={{ width: '24rem', marginBottom: '1rem' }}>
        <label htmlFor='questionType'>Выберите тип теста</label>
        <Segmented
          name='questionType'
          options={['Выбор ответа', 'Развернутый ответ', 'Соотнести ответы']}
          onChange={(value) => {
            const type = value === 'Выбор ответа' ? 1 : value === 'Развернутый ответ' ? 2 : 3
            setData({ ...data, questionType: type })
            setQuestionType(type)
          }}
          style={{ marginBottom: 24 }}
        />
        {data?.questionType && testConstructor()}
      </div>
      <Button onClick={() => console.log(data)}>'fwefewfwef</Button>
    </div>
  )
}
