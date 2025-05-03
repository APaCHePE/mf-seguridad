import { Component } from '@angular/core';
import { MonthlyComparisonWidget } from './components/monthlycomparisonwidget';
import { InsightsWidget } from './components/insightswidget';
import { StatsWidget } from './components/statswidget';
import { StoresWidget } from './components/storeswidget';
import { TopSearchesWidget } from './components/topsearcheswidget';
import { ExpensesWidget } from './components/expenseswidget';
import { RatingsWidget } from './components/ratingswidget';

@Component({
  selector: 'app-dashboard-analytics',
  imports: [MonthlyComparisonWidget, InsightsWidget, StatsWidget, StoresWidget, TopSearchesWidget, ExpensesWidget, RatingsWidget],
  templateUrl: './analytics.component.html'
})
export class AnalyticsComponent {}
