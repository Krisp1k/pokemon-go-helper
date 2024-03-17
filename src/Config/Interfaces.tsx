export interface NavItem_I {
    Name: string,
    Slug: string,
    Component: string
    Order: number
}

export interface BestCounters_I {
    icon?: string,
    counter: string,
    value: number,
    label: string
}