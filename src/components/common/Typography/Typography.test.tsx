import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Typography from './Typography';
import s from './Typography.module.scss';

describe('Typography', () => {
  describe('Rendering', () => {
    it('renders with children', () => {
      render(<Typography>Hello World</Typography>);
      expect(screen.getByText('Hello World')).toBeInTheDocument();
    });

    it('renders with default tag (span)', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.querySelector('span');
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('Text');
    });

    it('renders with JSX children', () => {
      render(
        <Typography>
          <strong>Bold</strong> and <em>Italic</em>
        </Typography>,
      );
      expect(screen.getByText(/Bold/)).toBeInTheDocument();
      expect(screen.getByText(/Italic/)).toBeInTheDocument();
    });
  });

  describe('Props - Tag', () => {
    it('renders as span when tag is "span"', () => {
      const { container } = render(<Typography tag="span">Text</Typography>);
      expect(container.querySelector('span')).toBeInTheDocument();
    });

    it('renders as div when tag is "div"', () => {
      const { container } = render(<Typography tag="div">Text</Typography>);
      expect(container.querySelector('div')).toBeInTheDocument();
    });

    it('renders as p when tag is "p"', () => {
      const { container } = render(<Typography tag="p">Text</Typography>);
      expect(container.querySelector('p')).toBeInTheDocument();
    });

    it('renders as h1 when tag is "h1"', () => {
      render(<Typography tag="h1">Heading 1</Typography>);
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
    });

    it('renders as h2 when tag is "h2"', () => {
      render(<Typography tag="h2">Heading 2</Typography>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('renders as h3 when tag is "h3"', () => {
      render(<Typography tag="h3">Heading 3</Typography>);
      expect(screen.getByRole('heading', { level: 3 })).toBeInTheDocument();
    });

    it('renders as h4 when tag is "h4"', () => {
      render(<Typography tag="h4">Heading 4</Typography>);
      expect(screen.getByRole('heading', { level: 4 })).toBeInTheDocument();
    });

    it('renders as h5 when tag is "h5"', () => {
      render(<Typography tag="h5">Heading 5</Typography>);
      expect(screen.getByRole('heading', { level: 5 })).toBeInTheDocument();
    });

    it('renders as h6 when tag is "h6"', () => {
      render(<Typography tag="h6">Heading 6</Typography>);
      expect(screen.getByRole('heading', { level: 6 })).toBeInTheDocument();
    });
  });

  describe('Props - Variant', () => {
    it('renders with default variant (text-base)', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-base']);
    });

    it('renders with variant="heading"', () => {
      const { container } = render(<Typography variant="heading">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.variant_heading);
    });

    it('renders with variant="sub-heading"', () => {
      const { container } = render(<Typography variant="sub-heading">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_sub-heading']);
    });

    it('renders with variant="sub-heading-bold"', () => {
      const { container } = render(<Typography variant="sub-heading-bold">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_sub-heading-bold']);
    });

    it('renders with variant="text-base"', () => {
      const { container } = render(<Typography variant="text-base">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-base']);
    });

    it('renders with variant="text-base-bold"', () => {
      const { container } = render(<Typography variant="text-base-bold">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-base-bold']);
    });

    it('renders with variant="text-small"', () => {
      const { container } = render(<Typography variant="text-small">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-small']);
    });
  });

  describe('Props - Color', () => {
    it('renders with default color (black)', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.color_black);
    });

    it('renders with color="black"', () => {
      const { container } = render(<Typography color="black">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.color_black);
    });

    it('renders with color="white"', () => {
      const { container } = render(<Typography color="white">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.color_white);
    });

    it('renders with color="gray"', () => {
      const { container } = render(<Typography color="gray">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.color_gray);
    });
  });

  describe('Props - Align', () => {
    it('renders with default align (start)', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'start' });
    });

    it('renders with align="start"', () => {
      const { container } = render(<Typography align="start">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'start' });
    });

    it('renders with align="center"', () => {
      const { container } = render(<Typography align="center">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'center' });
    });

    it('renders with align="end"', () => {
      const { container } = render(<Typography align="end">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'end' });
    });

    it('renders with align="left"', () => {
      const { container } = render(<Typography align="left">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'left' });
    });

    it('renders with align="right"', () => {
      const { container } = render(<Typography align="right">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'right' });
    });

    it('renders with align="justify"', () => {
      const { container } = render(<Typography align="justify">Text</Typography>);
      const element = container.firstChild as HTMLElement;
      expect(element).toHaveStyle({ textAlign: 'justify' });
    });
  });

  describe('Props - ClassName', () => {
    it('renders with custom className', () => {
      const { container } = render(<Typography className="custom-class">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass('custom-class');
    });

    it('combines custom className with default classes', () => {
      const { container } = render(
        <Typography className="custom-class" variant="heading" color="white">
          Text
        </Typography>,
      );
      const element = container.firstChild;
      expect(element).toHaveClass('custom-class');
      expect(element).toHaveClass(s.variant_heading);
      expect(element).toHaveClass(s.color_white);
    });
  });

  describe('Props - Combination', () => {
    it('renders with all props combined', () => {
      const { container } = render(
        <Typography
          tag="h1"
          variant="heading"
          color="white"
          align="center"
          className="custom-heading"
        >
          Main Title
        </Typography>,
      );

      const element = container.firstChild as HTMLElement;
      expect(element.tagName).toBe('H1');
      expect(element).toHaveClass(s.variant_heading);
      expect(element).toHaveClass(s.color_white);
      expect(element).toHaveClass('custom-heading');
      expect(element).toHaveStyle({ textAlign: 'center' });
      expect(element).toHaveTextContent('Main Title');
    });

    it('renders paragraph with multiple props', () => {
      const { container } = render(
        <Typography tag="p" variant="text-base" color="gray" align="justify">
          Lorem ipsum dolor sit amet
        </Typography>,
      );

      const element = container.querySelector('p');
      expect(element).toBeInTheDocument();
      expect(element).toHaveClass(s['variant_text-base']);
      expect(element).toHaveClass(s.color_gray);
      expect(element).toHaveStyle({ textAlign: 'justify' });
    });
  });

  describe('Additional HTML Attributes', () => {
    it('renders with id attribute', () => {
      const { container } = render(<Typography id="custom-id">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('id', 'custom-id');
    });

    it('renders with data attributes', () => {
      render(<Typography data-testid="test-typography">Text</Typography>);
      expect(screen.getByTestId('test-typography')).toBeInTheDocument();
    });

    it('renders with title attribute', () => {
      const { container } = render(<Typography title="Tooltip text">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('title', 'Tooltip text');
    });

    it('renders with aria-label', () => {
      render(<Typography aria-label="Custom label">Text</Typography>);
      const element = screen.getByLabelText('Custom label');
      expect(element).toBeInTheDocument();
    });

    it('renders with role attribute', () => {
      const { container } = render(<Typography role="status">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('role', 'status');
    });
  });

  describe('Semantic HTML', () => {
    it('renders heading tags with correct semantics', () => {
      render(<Typography tag="h1">Main Heading</Typography>);
      const heading = screen.getByRole('heading', { level: 1, name: 'Main Heading' });
      expect(heading).toBeInTheDocument();
    });

    it('combines semantic tag with appropriate variant', () => {
      render(
        <Typography tag="h2" variant="sub-heading">
          Section Title
        </Typography>,
      );
      const heading = screen.getByRole('heading', { level: 2 });
      expect(heading).toHaveTextContent('Section Title');
      expect(heading).toHaveClass(s['variant_sub-heading']);
    });

    it('uses paragraph tag for body text', () => {
      const { container } = render(
        <Typography tag="p" variant="text-base">
          Body text
        </Typography>,
      );
      const paragraph = container.querySelector('p');
      expect(paragraph).toBeInTheDocument();
      expect(paragraph).toHaveTextContent('Body text');
    });
  });

  describe('CSS Classes', () => {
    it('always includes variant class', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-base']);
    });

    it('always includes color class', () => {
      const { container } = render(<Typography>Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveClass(s.color_black);
    });

    it('includes all specified classes', () => {
      const { container } = render(
        <Typography variant="heading" color="white" className="custom">
          Text
        </Typography>,
      );
      const element = container.firstChild;
      expect(element).toHaveClass(s.variant_heading);
      expect(element).toHaveClass(s.color_white);
      expect(element).toHaveClass('custom');
    });
  });

  describe('Content Variations', () => {
    it('renders empty children', () => {
      const { container } = render(<Typography>{''}</Typography>);
      const element = container.firstChild;
      expect(element).toBeInTheDocument();
      expect(element).toHaveTextContent('');
    });

    it('renders with number as children', () => {
      render(<Typography>{42}</Typography>);
      expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders with multiple text nodes', () => {
      render(<Typography>First line Second line</Typography>);
      const element = screen.getByText(/First line Second line/);
      expect(element).toBeInTheDocument();
    });

    it('renders with nested components', () => {
      render(
        <Typography>
          Outer text
          <Typography tag="span" color="gray">
            Inner text
          </Typography>
        </Typography>,
      );
      expect(screen.getByText(/Outer text/)).toBeInTheDocument();
      expect(screen.getByText('Inner text')).toBeInTheDocument();
    });
  });

  describe('Style Combinations', () => {
    it('heading variant with black color', () => {
      const { container } = render(
        <Typography variant="heading" color="black">
          Text
        </Typography>,
      );
      const element = container.firstChild;
      expect(element).toHaveClass(s.variant_heading);
      expect(element).toHaveClass(s.color_black);
    });

    it('text-small variant with gray color', () => {
      const { container } = render(
        <Typography variant="text-small" color="gray">
          Text
        </Typography>,
      );
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-small']);
      expect(element).toHaveClass(s.color_gray);
    });

    it('bold variant with white color', () => {
      const { container } = render(
        <Typography variant="text-base-bold" color="white">
          Text
        </Typography>,
      );
      const element = container.firstChild;
      expect(element).toHaveClass(s['variant_text-base-bold']);
      expect(element).toHaveClass(s.color_white);
    });
  });

  describe('Accessibility', () => {
    it('heading is accessible by role and level', () => {
      render(<Typography tag="h2">Section Title</Typography>);
      expect(screen.getByRole('heading', { level: 2 })).toBeInTheDocument();
    });

    it('content is readable by screen readers', () => {
      render(<Typography>Important message</Typography>);
      expect(screen.getByText('Important message')).toBeInTheDocument();
    });

    it('supports aria-describedby', () => {
      const { container } = render(<Typography aria-describedby="description">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('aria-describedby', 'description');
    });

    it('supports aria-hidden', () => {
      const { container } = render(<Typography aria-hidden="true">Text</Typography>);
      const element = container.firstChild;
      expect(element).toHaveAttribute('aria-hidden', 'true');
    });
  });

  describe('Integration Tests', () => {
    it('renders a complete heading hierarchy', () => {
      const { container } = render(
        <div>
          <Typography tag="h1" variant="heading">
            Main Title
          </Typography>
          <Typography tag="h2" variant="sub-heading">
            Subtitle
          </Typography>
          <Typography tag="p" variant="text-base">
            Body text
          </Typography>
        </div>,
      );

      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Subtitle');
      expect(container.querySelector('p')).toHaveTextContent('Body text');
    });

    it('renders styled content block', () => {
      const { container } = render(
        <Typography
          tag="div"
          variant="text-base"
          color="gray"
          align="center"
          className="content-block"
        >
          <Typography tag="h3" variant="sub-heading-bold" color="black">
            Section Title
          </Typography>
          <Typography tag="p" variant="text-base" color="gray">
            Description text
          </Typography>
        </Typography>,
      );

      const outerDiv = container.querySelector('.content-block');
      expect(outerDiv).toBeInTheDocument();
      expect(outerDiv).toHaveStyle({ textAlign: 'center' });
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Section Title');
      expect(screen.getByText('Description text')).toBeInTheDocument();
    });
  });
});
