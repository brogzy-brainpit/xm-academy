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
            <Heading2 className='capitalize text-neutral-800 text-left mb-6 font-custom'>
              Frequently Asked Questions
            </Heading2>
            <Questions />
            <div className='my-10'>
              <Heading2 className='capitalize text-neutral-800 text-left mb-2 font-custom'>

                still have questions?
              </Heading2>
              <Paragraph className={'text-neutral-800 font-body text-para'}>
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
    { q: 'how long does trailer production take?',
      a: 'Our standard trailer production typically takes 4-6 weeks. Complex custom designs may require additional time for precise engineering and fabrication.'
    },
     { q: 'Do you offer custom trailer designs?',
      a: 'Yes, we specialize in custom trailer solutions. Our engineering team works closely with clients to create trailers that meet unique transportation requirements.'
    },
     { q: 'what materials do you use?',
      a: 'We use high-grade steel and aluminium alloys selected for durability, strength, and performance in demanding transportation environments.'
    },
    { q: 'How do you ensure quality?',
      a: 'Our rigorous quality control process includes multiple inspection stages, stress testing, and final performance verification before delivery.'
    },
     { q: 'How do you ensure quality?',
      a: 'Our rigorous quality control process includes multiple inspection stages, stress testing, and final performance verification before delivery.'
    },
     { q: 'What is your warranty?',
      a: 'we offer a comprehensive warranty covering manufacturing defects. Each trailer comes with a standard 1-year structural guarantee.'
    },
    { q: 'can you handle large orders?',
      a: 'Our facility is equipped to manage fleet-wide trailer manufacturing with consistent quality and efficient production timelines.'
    },
      
      
      
      ]

  const [openIndex, setOpenIndex] = useState(null)

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className='divide-y divide-neutral-800'>
      {QA.map(({ q, a }, i) => (
        <div key={i} className='py-4'>
          {/* Question Row */}
          <div
            className='flex justify-between items-center cursor-pointer select-none'
            onClick={() => toggle(i)}
          >
            <Paragraph className='font-body text-neutral-800 text-para font-bold'>{q}</Paragraph>
            {openIndex === i ? (
              <Minus className='w-5 h-5 text-neutral-800' />
            ) : (
              <Plus className='w-5 h-5 text-neutral-800' />
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
                <Paragraph className='font-body mt-3 text-neutral-800 opacity-80 w-[80%]'>
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
