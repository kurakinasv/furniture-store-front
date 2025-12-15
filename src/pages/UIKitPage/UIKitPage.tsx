import * as React from 'react';
import { PageWrapper } from 'components/layout';
import { Button, Typography, Input, Card } from 'components/common';
import HeartIcon from 'assets/icons/heart.svg?react';

import s from './UIKitPage.module.scss';

const UIKitPage: React.FC = () => {
  const [inputValue, setInputValue] = React.useState('');
  const [inputValue2, setInputValue2] = React.useState('');
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [isFavorite2, setIsFavorite2] = React.useState(true);

  return (
    <PageWrapper>
      <div className={s.root}>
        <Typography tag="h1" variant="heading" className={s.pageTitle}>
          UI Kit Components
        </Typography>

        <section className={s.section}>
          <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
            Icons
          </Typography>
          <div className={s.examples}>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Heart Icon (SVG)
              </Typography>
              <div className={s.iconDisplay}>
                <HeartIcon />
              </div>
            </div>
          </div>
        </section>
        {/* Typography Section */}
        <section className={s.section}>
          <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
            Typography
          </Typography>
          <div className={s.examples}>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Heading
              </Typography>
              <Typography variant="heading">This is a heading</Typography>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Sub-heading
              </Typography>
              <Typography variant="sub-heading">This is a sub-heading</Typography>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Sub-heading Bold
              </Typography>
              <Typography variant="sub-heading-bold">This is a sub-heading bold</Typography>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Text Base
              </Typography>
              <Typography variant="text-base">This is base text</Typography>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Text Base Bold
              </Typography>
              <Typography variant="text-base-bold">This is base text bold</Typography>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Text Small
              </Typography>
              <Typography variant="text-small">This is small text</Typography>
            </div>
            <div className={s.example}>
              <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
                Colors
              </Typography>
              <div className={s.colorExamples}>
                <Typography variant="text-base" color="black">
                  Black text
                </Typography>
                <Typography variant="text-base" color="gray">
                  Gray text
                </Typography>
                <div className={s.darkBackground}>
                  <Typography variant="text-base" color="white">
                    White text
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Button Section */}
        <section className={s.section}>
          <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
            Buttons
          </Typography>
          <div className={s.examples}>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Sizes
              </Typography>
              <div className={s.buttonRow}>
                <Button size="s">Small</Button>
                <Button size="m">Medium</Button>
                <Button size="l">Large</Button>
                <Button size="xl">Extra Large</Button>
              </div>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Colors
              </Typography>
              <div className={s.buttonRow}>
                <Button color="default">Default</Button>
                <Button color="transparent">Transparent</Button>
              </div>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                States
              </Typography>
              <div className={s.buttonRow}>
                <Button>Normal</Button>
                <Button disabled>Disabled</Button>
              </div>
            </div>
          </div>
        </section>

        {/* Input Section */}
        <section className={s.section}>
          <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
            Inputs
          </Typography>
          <div className={s.examples}>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                Sizes
              </Typography>
              <div className={s.inputColumn}>
                <Input id="medium" size="m" placeholder="Medium input" />
                <Input id="large" size="l" placeholder="Large input" />
              </div>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                With Label
              </Typography>
              <div className={s.inputColumn}>
                <Input id="email" label="Email" placeholder="Enter your email" />
                <Input
                  id="password"
                  label="Password"
                  type="password"
                  placeholder="Enter your password"
                />
              </div>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                With Clear Button
              </Typography>
              <div className={s.inputColumn}>
                <Input
                  id="search"
                  label="Search"
                  placeholder="Type to search..."
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  showClearButton
                  onClear={() => setInputValue('')}
                />
                <Input
                  id="search2"
                  size="l"
                  placeholder="Large input with clear"
                  value={inputValue2}
                  onChange={(e) => setInputValue2(e.target.value)}
                  showClearButton
                  onClear={() => setInputValue2('')}
                />
              </div>
            </div>
            <div className={s.example}>
              <Typography variant="text-small" color="gray" className={s.label}>
                States
              </Typography>
              <div className={s.inputColumn}>
                <Input id="normal" placeholder="Normal" />
                <Input id="disabled" placeholder="Disabled" disabled />
                <Input id="read-only" placeholder="Read-only" readOnly value="Read-only value" />
              </div>
            </div>
          </div>
        </section>

        {/* Card Section */}
        <section className={s.section}>
          <Typography tag="h2" variant="sub-heading-bold" className={s.sectionTitle}>
            Cards
          </Typography>
          <div className={s.examples}>
            <div className={s['card-row']}>
              <Card
                price="1 000 р"
                title="комод-стелаж 400*1200 м"
                imagePlaceholder="комод"
                isFavorite={isFavorite}
                onFavoriteClick={() => setIsFavorite(!isFavorite)}
                onAddToCart={() => console.log('Add to cart - small')}
              />
              <Card
                price="1 000 р"
                title="комод-стелаж 400*1200 м"
                imagePlaceholder="комод"
                imageUrl="https://i.pinimg.com/1200x/44/60/4d/44604d7a641b63112a8df54fffd3e36a.jpg"
                isFavorite={isFavorite2}
                onFavoriteClick={() => setIsFavorite2(!isFavorite2)}
                onAddToCart={() => console.log('Add to cart - medium')}
              />
            </div>
          </div>
        </section>
      </div>
    </PageWrapper>
  );
};

export default UIKitPage;
