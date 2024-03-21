import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import SectionSmallHeading from '@/app/components/SectionSmallHeading'

describe('Section Small Heading', () => {

    beforeEach(() => {
      render(<SectionSmallHeading text="Test Heading" className="test-class" />)
    })

    it('should render the text with classname', () => {
      expect(screen.getByTestId('text').textContent).toEqual('Test Heading')
      expect(screen.getByTestId('heading-div').className).toContain('test-class')
    })
})
