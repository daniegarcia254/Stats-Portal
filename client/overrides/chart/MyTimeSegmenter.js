/**
 * @class Ext.chart.axis.segmenter.Time
 * @extends Ext.chart.axis.segmenter.Segmenter
 * 
 * Time data type.
 */
Ext.define('Ext.chart.MyTimeSegmenter', {
    extend: 'Ext.chart.axis.segmenter.Time',
    alias: 'segmenter.mytimesegmenter',
 
    config: {
        /**
         * @cfg {Object} step 
         * @cfg {String} step.unit The unit of the step (Ext.Date.DAY, Ext.Date.MONTH, etc).
         * @cfg {Number} step.step The number of units for the step (1, 2, etc).
         * If specified, will override the result of {@link #preferredStep}.
         * For example:
         *     
         *     step: {
         *         unit: Ext.Date.HOUR,
         *         step: 1
         *     }
         */
        step: {
            unit: Ext.Date.MONTH,
            step: 1
        }
    }
});