import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'
import Section from '@/app/layout/Section'
import GridColumn from '@/app/layout/GridColumn'
import Heading2 from '@/app/typography/Heading2'
import Paragraph from '@/app/typography/Paragraph'

function FAQS() {
  return (
    <div className='bg-brand-secondary'>
      <Section>
        <GridColumn className='w-full'>
          <div className='col-span-full lgcol-span-7'>
            <Heading2 className='capitalize text-brand-text text-left mb-6 font-custom'>
              Frequently Asked Questions
            </Heading2>
            <Questions />
            <div className='my-10'>
              <Heading2 className='capitalize text-brand-text text-left mb-2 font-custom'>

                still have questions?
              </Heading2>
              <Paragraph className={'text-brand-text font-body text-para'}>
                Our team is ready to provide detailed information about our services
              </Paragraph>
               <div className="font-body my-2.5 flex max-w-fit items-center border border-brand-accent bg-brand-accent whitespace-nowrap">
 <a href='/' className=' text-white flex w-full justify-between items-center transition-all duration-300 ease-out'>
  <span className="p-4 hidden lg:block capitalize">contact our team</span>
  <span className="inline-fle p-4 block lg:hidden capitalize">contact us</span>
  <span className="inline-flex p-4">
  <Plus className="w-5 h-5 p text-white" />
  </span>
 </a>
    </div>
            </div>
          </div>
        </GridColumn>
      </Section>
    </div>
  )
}

const Questions = () => {
  const QA = [
    { q: 'Is this XM trading academy suitable for beginners?',
      a: 'Yes. Our crypto trading courses are designed for beginners and intermediate traders with no prior experience required.'
    },
     { q: 'Do you guarantee profits from crypto trading?',
      a: 'No. We do not guarantee profits. Crypto trading involves risk, and results depend on market conditions and individual discipline.'
    },
     { q: 'Can I learn crypto trading online in Nigeria?',
      a: 'Yes. Our online crypto trading academy is accessible anywhere in Nigeria and internationally.'
    },
    { q: 'What are crypto trading signals?',
      a: 'Crypto trading signals are analyzed market insights shared to support learning and trade planning. They are not financial advice.'
    },
     { q: 'Is crypto trading risky?',
      a: 'Yes. Cryptocurrency trading carries significant risk due to market volatility.'
    }     
      ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='divide-y divide-brand-text'>
      {QA.map(({ q, a }, i) => (
        <div key={i} className='py-4'>
          {/* Question Row */}
          <div
            className='flex justify-between items-center cursor-pointer select-none'
            onClick={() => toggle(i)}
          >
            <Paragraph className='font-body text-brand-text text-para font-bold'>{q}</Paragraph>
            {openIndex === i ? (
              <Minus className='w-5 h-5 text-brand-text' />
            ) : (
              <Plus className='w-5 h-5 text-brand-text' />
            )}
          </div>

          {/* Answer */}
          <AnimatePresence initial={false}>
            {openIndex === i && (
              <motion.div
                key="answer"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className='overflow-hidden'
              >
                <Paragraph className='font-body mt-3 text-brand-text opacity-80 w-[80%]'>
                  {a}
                </Paragraph>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  )
}

export default FAQS
