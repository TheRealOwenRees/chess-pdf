import Lpv from '@/app/chessboard/components/Lpv'

// TODO - fix this test
describe('<Lpv />', () => {
  it('renders a board with no game loaded', () => {
    cy.mount(<Lpv />)
    // cy.getBySel('lpv-board').should('be.visible')
  })
})

// old data for Board
// describe('<Board />', () => {
//   it('renders a board with no game loaded', () => {
//     cy.mount(<Board diagrams={[]}>{''}</Board>)
//     cy.getBySel('board').should('be.visible')
//   })
//
//   it('renders a board with a game loaded', () => {
//     const pgn = '1. e4 e5 2. Nf3 Nc6 3. Bb5 a6'
//     const formattedPgn = pgn.replace(/\s/g, '')
//     cy.mount(<Board diagrams={[]}>{pgn}</Board>)
//     cy.getBySel('board').should('be.visible')
//     cy.get('#boardMoves').invoke('text').then((text) => {
//       const formattedText = text.replace(/\s/g, '').replace('*', '')
//       expect(formattedText).to.equal(formattedPgn)
//     })
//   })
// })