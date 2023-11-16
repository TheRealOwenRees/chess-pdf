import { Message } from "@/types";
import { Dispatch, SetStateAction } from "react";
import Alert from "@/app/components/Alert";

describe('<Alert />', () => {
  let setMessageSpy: Dispatch<SetStateAction<Message>>

  describe('Success', () => {

    beforeEach(() => {
      setMessageSpy = cy.spy()
      cy.mount(<Alert type={'success'} message={'Test Message'} setMessage={setMessageSpy}/>)
    })

    it('Success Text and Class', () => {
      cy.get('[data-cy="type"]').should('have.text', 'success! ')
      cy.get('[data-cy="message"]').should('have.text', 'Test Message')
      cy.get('[data-cy="alert-div"]').should('have.class', 'border-green-400')
    })

    it('Close Button', () => {
      cy.get('[data-cy="close-button"]').click()
      cy.wrap(setMessageSpy).should('be.calledWith', {type: '', message: ''})
    })
  })

  describe('Error', () => {

    beforeEach(() => {
      setMessageSpy = cy.spy()
      cy.mount(<Alert type={'error'} message={'Test Message'} setMessage={setMessageSpy}/>)
    })

    it ('Error Text and Class', () => {
      cy.get('[data-cy="type"]').should('have.text', 'error! ')
      cy.get('[data-cy="message"]').should('have.text', 'Test Message')
      cy.get('[data-cy="alert-div"]').should('have.class', 'border-red-400')
    })

    it('Close Button', () => {
      cy.get('[data-cy="close-button"]').click()
      cy.wrap(setMessageSpy).should('be.calledWith', {type: '', message: ''})
    })
  })
})