import { Info } from 'lucide-react'
import React from 'react'

type KpiMetric = {
  label: string
  value: string
  icon: 'folder' | 'message' | 'invoice' | 'storage'
}

type NewKpiGridProps = {
  items: KpiMetric[]
}

function FolderIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M2 19V7.54902C2 6.10516 2 5.38322 2.24332 4.81647C2.5467 4.10985 3.10985 3.5467 3.81647 3.24332C4.38322 3 5.09805 3 6.54902 3H7.04311C7.64819 3 8.22075 3.27394 8.60041 3.74509L10.4175 6M10.4175 6H16C17.4001 6 18.1002 6 18.635 6.27248C19.1054 6.51217 19.4878 6.89462 19.7275 7.36502C20 7.8998 20 8.59987 20 10V11M10.4175 6H7'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M3.15802 15.5144L3.45643 14.7717C4.19029 12.9449 4.55723 12.0316 5.3224 11.5158C6.08757 11 7.07557 11 9.05157 11H17.1119C19.8004 11 21.1446 11 21.7422 11.8787C22.3397 12.7575 21.8405 14.0002 20.842 16.4856L20.5436 17.2283C19.8097 19.0551 19.4428 19.9684 18.6776 20.4842C17.9124 21 16.9244 21 14.9484 21H6.88812C4.19961 21 2.85535 21 2.25782 20.1213C1.66029 19.2425 2.15953 17.9998 3.15802 15.5144Z'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function MessageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M21.5 12C21.5 17.2467 17.2467 21.5 12 21.5C10.3719 21.5 8.8394 21.0904 7.5 20.3687C5.63177 19.362 4.37462 20.2979 3.26592 20.4658C3.09774 20.4913 2.93024 20.4302 2.80997 20.31C2.62741 20.1274 2.59266 19.8451 2.6935 19.6074C3.12865 18.5818 3.5282 16.6382 2.98341 15C2.6698 14.057 2.5 13.0483 2.5 12C2.5 6.75329 6.75329 2.5 12 2.5C17.2467 2.5 21.5 6.75329 21.5 12Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M17 12C17 12 14.958 15 12 15C9.04197 15 7 12 7 12C7 12 9 9 12 9C15 9 17 12 17 12Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path
        d='M12 12H12.009'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  )
}

function InvoiceIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M4 18.6458V8.05426C4 5.20025 4 3.77325 4.87868 2.88663C5.75736 2 7.17157 2 10 2H14C16.8284 2 18.2426 2 19.1213 2.88663C20 3.77325 20 5.20025 20 8.05426V18.6458C20 20.1575 20 20.9133 19.538 21.2108C18.7831 21.6971 17.6161 20.6774 17.0291 20.3073C16.5441 20.0014 16.3017 19.8485 16.0325 19.8397C15.7417 19.8301 15.4949 19.9768 14.9709 20.3073L13.06 21.5124C12.5445 21.8374 12.2868 22 12 22C11.7132 22 11.4555 21.8374 10.94 21.5124L9.02913 20.3073C8.54415 20.0014 8.30166 19.8485 8.03253 19.8397C7.74172 19.8301 7.49493 19.9768 6.97087 20.3073C6.38395 20.6774 5.21687 21.6971 4.46195 21.2108C4 20.9133 4 20.1575 4 18.6458Z'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
      <path d='M11 11H8' strokeLinecap='round' strokeLinejoin='round' />
      <path d='M14 7H8' strokeLinecap='round' strokeLinejoin='round' />
    </svg>
  )
}

function StorageIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      viewBox='0 0 24 24'
      fill='none'
      stroke='currentColor'
      {...props}
    >
      <path
        d='M5.5 8.89922V8C5.5 5.17157 5.5 3.75736 6.37868 2.87868C7.25736 2 8.67157 2 11.5 2H14.5C17.3284 2 18.7426 2 19.6213 2.87868C20.5 3.75736 20.5 5.17157 20.5 8V14C20.5 17.7712 20.5 19.6569 19.3284 20.8284C18.1569 22 16.2712 22 12.5 22H10.6254C7.69689 22 6.23263 22 5.19651 21.2702C4.8212 21.0058 4.49421 20.6788 4.22984 20.3035C3.5 19.2674 3.5 17.8031 3.5 14.8746V14.6008C3.5 14.0589 3.5 13.7879 3.54625 13.5276C3.60289 13.2088 3.71077 12.9012 3.8657 12.6169C3.99221 12.3847 4.16148 12.1732 4.5 11.75C4.83852 11.3268 5.00779 11.1153 5.1343 10.8831C5.28923 10.5988 5.39711 10.2912 5.45375 9.97241C5.5 9.71207 5.5 9.44112 5.5 8.89922Z'
        strokeLinecap='round'
      />
      <path d='M16.5 6V9' strokeLinecap='round' />
      <path d='M13 6V9' strokeLinecap='round' />
      <path d='M9.5 6V9' strokeLinecap='round' />
    </svg>
  )
}

const iconMap = {
  folder: FolderIcon,
  message: MessageIcon,
  invoice: InvoiceIcon,
  storage: StorageIcon,
}

export function NewKpiGrid({ items }: NewKpiGridProps) {
  return (
    <div className='grid gap-4 md:grid-cols-2 xl:grid-cols-4'>
      {items.map((item, index) => {
        const Icon = iconMap[item.icon]
        const isFirst = index === 0

        return (
          <div
            key={item.label}
            className={`flex flex-col gap-[50px] rounded-2xl border p-[15px] pb-5 ${
              isFirst
                ? 'border-[#261F1C] bg-[#261F1C]'
                : 'border-[#131313] bg-[#131313]'
            }`}
          >
            <div className='flex items-center justify-between'>
              <div className='flex items-center gap-2'>
                <span className='text-sm text-white'>{item.label}</span>
                <Info
                  className='h-[15px] w-[15px] text-white'
                  strokeWidth={0.9375}
                />
              </div>
              <Icon className='h-6 w-6 text-white' strokeWidth={1.5} />
            </div>
            <div className='text-[32px] font-medium leading-5 text-white'>
              {item.value}
            </div>
          </div>
        )
      })}
    </div>
  )
}
